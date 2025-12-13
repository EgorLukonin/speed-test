from flask import Flask, jsonify, render_template, request
from flask_cors import CORS
from requests import get, post
from ping3 import ping
import time

app = Flask(__name__)
CORS(app, origins="*")


class SpeedTest:
    def __init__(self):
        self.download_speeds = []
        self.upload_speeds = []
        self.ping_times = []

    def test_ping(self, host="8.8.8.8"):
        result = ping(host)
        return result * 1000

    def test_download(self, url='https://mirror.yandex.ru/fedora/fullfilelist', max_mb=50):
        start = time.time()
        response = get(url, stream=True)
        total = 0

        for chunk in response.iter_content(1024):
            if chunk:
                total += len(chunk)
                if total > max_mb * 1024 * 1024:
                    break

        duration = time.time() - start
        return (total * 8) / (duration * 1_000_000) if duration > 0 else None

    def test_upload(self, url="https://www.gosuslugi.ru/api/time", size_mb=50):
        data = b'0' * (size_mb * 1024 * 1024)
        start = time.time()

        post(url, data=data, headers={'Content-Type': 'application/octet-stream'}, timeout=30)

        duration = time.time() - start
        return (len(data) * 8) / (duration * 1_000_000) if duration > 0 else None


# Создаем глобальный экземпляр SpeedTest
speed_test = SpeedTest()


@app.route("/")
def hello():
    return render_template('index.html')


@app.route('/api/upload')
def getUpload():
    result = speed_test.test_upload()

    return jsonify({
        'type': 'upload',
        'value': round(result, 2) if result else 0
    })


@app.route('/api/download')
def getDownload():
    result = speed_test.test_download(max_mb=10)

    return jsonify({
        'type': 'download',
        'value': round(result, 2) if result else 0
    })


@app.route('/api/ping')
def getPing():
    # Получаем IP клиента из запроса Flask
    # client_ip = request.remote_addr
    result = ping("8.8.8.8")
    result *= 1000

    return jsonify({
        'type': 'ping',
        'value': round(result, 0) if result else 0
    })


if __name__ == '__main__':
    app.run()