from flask import Flask, request
from linebot.v3.webhook import WebhookHandler
from linebot.v3.messaging import (
    Configuration,
    ApiClient,
    MessagingApi,
    ReplyMessageRequest,
    TextMessage
)
from linebot.v3.webhooks import MessageEvent, ImageMessageContent
from linebot.exceptions import InvalidSignatureError

import cloudinary
import cloudinary.uploader

import tempfile
import os

from linebot import LineBotApi

# =========================
# LINE 設定
# =========================

LINE_CHANNEL_ACCESS_TOKEN = 'rKA1dvvFfLCGlLewsWARj/dnSAby/atpPSELd7+9Vx4N9pSAsC0/VIerQp2YKNyPVUM6j2J3XWDTDVgFZye1q4I5iB4AT0i9oUVvI1d9BeiW2ZEQa76M5dtbOm5F/Nb6hv7pAOkbuUOTOmPIy5TIFAdB04t89/1O/w1cDnyilFU='

LINE_CHANNEL_SECRET = '8a5a65db4f628e6faffbcbd2759f7060'

configuration = Configuration(
    access_token=LINE_CHANNEL_ACCESS_TOKEN
)

handler = WebhookHandler(LINE_CHANNEL_SECRET)

line_bot_api = LineBotApi(LINE_CHANNEL_ACCESS_TOKEN)

# =========================
# Cloudinary 設定
# =========================

cloudinary.config(
    cloud_name='dortwkb4r',
    api_key='668868569426816',
    api_secret='sEULSrWsIe9pSYiSIhQE1QrVrPE'
)

# =========================
# Flask
# =========================

app = Flask(__name__)

@app.route("/callback", methods=['POST'])
def callback():

    signature = request.headers['X-Line-Signature']

    body = request.get_data(as_text=True)

    try:
        handler.handle(body, signature)

    except InvalidSignatureError:
        return 'Invalid signature', 400

    return 'OK'


# =========================
# 接收圖片
# =========================

@handler.add(MessageEvent)
def handle_image(event):

    try:

        if not isinstance(event.message, ImageMessageContent):
            return

        message_content = line_bot_api.get_message_content(
            event.message.id
        )

        with tempfile.NamedTemporaryFile(
            delete=False,
            suffix='.jpg'
        ) as tf:

            for chunk in message_content.iter_content():
                tf.write(chunk)

            temp_path = tf.name

        # 上傳 Cloudinary
        result = cloudinary.uploader.upload(
            temp_path,
            folder='wedding'
        )

        image_url = result['secure_url']

        os.remove(temp_path)

        with ApiClient(configuration) as api_client:

            line_bot_api_v3 = MessagingApi(api_client)

            line_bot_api_v3.reply_message(
                ReplyMessageRequest(
                    reply_token=event.reply_token,
                    messages=[
                        TextMessage(
                            text=f'''📸 照片已上傳成功 ❤️

🔗 照片網址：
{image_url}

感謝分享婚禮回憶 ✨'''
                        )
                    ]
                )
            )

    except Exception as e:

        print(e)


if __name__ == "__main__":
    app.run(host='0.0.0.0', port=10000)
