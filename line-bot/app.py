from flask import Flask, request

from linebot.v3.webhook import WebhookHandler

from linebot.v3.messaging import (
    Configuration,
    ApiClient,
    MessagingApi,
    ReplyMessageRequest,
    TextMessage
)

from linebot.v3.webhooks import (
    MessageEvent,
    ImageMessageContent,
    TextMessageContent
)

from linebot.exceptions import InvalidSignatureError

from linebot import LineBotApi

import cloudinary
import cloudinary.uploader

import tempfile
import os


# =========================
# LINE 設定
# =========================

LINE_CHANNEL_ACCESS_TOKEN = os.getenv(
    "LINE_CHANNEL_ACCESS_TOKEN"
)

LINE_CHANNEL_SECRET = os.getenv(
    "LINE_CHANNEL_SECRET"
)

configuration = Configuration(
    access_token=LINE_CHANNEL_ACCESS_TOKEN
)

handler = WebhookHandler(
    LINE_CHANNEL_SECRET
)

line_bot_api = LineBotApi(
    LINE_CHANNEL_ACCESS_TOKEN
)

# =========================
# Cloudinary 設定
# =========================

cloudinary.config(
    cloud_name=os.getenv("CLOUDINARY_CLOUD_NAME"),
    api_key=os.getenv("CLOUDINARY_API_KEY"),
    api_secret=os.getenv("CLOUDINARY_API_SECRET")
)

# =========================
# Flask
# =========================

app = Flask(__name__)

@app.route("/callback", methods=["POST"])
def callback():

    signature = request.headers["X-Line-Signature"]

    body = request.get_data(as_text=True)

    try:
        handler.handle(body, signature)

    except InvalidSignatureError:
        return "Invalid signature", 400

    return "OK"


# =========================
# 文字訊息
# =========================

@handler.add(MessageEvent)
def handle_message(event):

    try:

        # =========================
        # 婚禮照片牆指令
        # =========================

        if isinstance(event.message, TextMessageContent):

            user_text = event.message.text.strip()

            if user_text == "婚禮照片牆":

                with ApiClient(configuration) as api_client:

                    messaging_api = MessagingApi(api_client)

                    messaging_api.reply_message(
                        ReplyMessageRequest(
                            reply_token=event.reply_token,
                            messages=[
                                TextMessage(
                                    text=(
                                        "💍 婚禮照片牆 ❤️\n\n"
                                        "歡迎查看即時婚禮回憶：\n"
                                        "https://line-wedding-bot0618.vercel.app/wedding-wall"
                                    )
                                )
                            ]
                        )
                    )

            elif user_text == "help":

                with ApiClient(configuration) as api_client:

                    messaging_api = MessagingApi(api_client)

                    messaging_api.reply_message(
                        ReplyMessageRequest(
                            reply_token=event.reply_token,
                            messages=[
                                TextMessage(
                                    text=(
                                        "📸 使用方式\n\n"
                                        "1. 直接傳送照片即可上傳\n"
                                        "2. 輸入『婚禮照片牆』查看照片\n"
                                        "3. 系統會自動同步照片 ❤️"
                                    )
                                )
                            ]
                        )
                    )

        # =========================
        # 圖片訊息
        # =========================

        elif isinstance(event.message, ImageMessageContent):

            message_content = line_bot_api.get_message_content(
                event.message.id
            )

            with tempfile.NamedTemporaryFile(
                delete=False,
                suffix=".jpg"
            ) as tf:

                for chunk in message_content.iter_content():
                    tf.write(chunk)

                temp_path = tf.name

            # 上傳 Cloudinary
            result = cloudinary.uploader.upload(
                temp_path,
                folder="wedding"
            )

            image_url = result["secure_url"]

            os.remove(temp_path)

            with ApiClient(configuration) as api_client:

                messaging_api = MessagingApi(api_client)

                messaging_api.reply_message(
                    ReplyMessageRequest(
                        reply_token=event.reply_token,
                        messages=[
                            TextMessage(
                                text=(
                                    "📸 照片已上傳成功 ❤️\n\n"
                                    "照片已同步到婚禮照片牆 ✨\n\n"
                                    f"{image_url}"
                                )
                            )
                        ]
                    )
                )

    except Exception as e:

        print(e)


# =========================
# 啟動 Flask
# =========================

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=10000)
