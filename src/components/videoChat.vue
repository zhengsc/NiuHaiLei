<template>
    <div class="video-chat-wrap">
        <el-button @click="registerUser">注册</el-button>
        <el-button @click="loginUser">登陆</el-button>
        <el-row>
            <el-col
                :span="24"
                class="message-wrap"
            >
                <div class="message-scroll-container">
                    <component
						v-for="(msg, index) in messageList" 
						:key="index"
						:is="'Message' + msg.type"
						:message="msg"
					></component>
                    <!-- <div class="message-item-line master">
                        <img class="head-sculpture" src="../assets/images/master-detail-comment-user.jpg" alt="">
                        <div class="message-body">
                            <p class="message-time">2018-08-31 12:00:00</p>
                            <div class="message-content">大师，你好</div>
                        </div>
                    </div>
                    <div class="message-item-line self">
                        <div class="message-body">
                            <p class="message-time">2018-08-31 12:00:00</p>
                            <div class="message-content">大师，你好</div>
                        </div>
                        <img class="head-sculpture" src="../assets/images/master-detail-comment-write-user.jpg" alt="">
                    </div>
                    <div class="message-item-line master">
                        <img class="head-sculpture" src="../assets/images/master-detail-comment-user.jpg" alt="">
                        <div class="message-body">
                            <p class="message-time">2018-08-31 12:00:00</p>
                            <div class="message-content">大师，你好大师，你好大师，你好大师，你好大师，你好大师，你好大师，你好大师，你好大师，你好大师，你好大师，你好大师，你好大师，你好大师，你好</div>
                        </div>
                    </div>
                    <div class="message-item-line self">
                        <div class="message-body">
                            <p class="message-time">2018-08-31 12:00:00</p>
                            <div class="message-content">大师，你好大师，你好大师，你好大师，你好大师，你好大师，你好大师，你好大师，你好大师，你好大师，你好大师，你好大师，你好大师，你好大师，你好</div>
                        </div>
                        <img class="head-sculpture" src="../assets/images/master-detail-comment-write-user.jpg" alt="">
                    </div> -->
                </div>
            </el-col>
        </el-row>
        <el-row>
            <el-col
                :span="24"
                class="message-tool"
            >
                <div class="chat-tool-wrap">
                    <div class="select-tool">
                        <img
                            v-for="(icon, index) in chatToolList"
                            :key="index"
                            :src="icon.icon" 
                            :alt="icon.text"
                            :title="icon.text"
                            :class="['chat-tool-icon']"
							@click="selectMessageType(icon.type)"
                        >
						<input class="hidden-input" type="file" id="image-input" accept="image/*" />
                    </div>
                    <div class="video-btn">
                        <img 
							class="chat-tool-icon primary" 
							src="../assets/images/video-chat-video.png" 
							alt="视频通话" 
							title="视频通话"
							@click="selectMessageType('video')"
						>
                    </div>
                </div>
                <div class="chat-input-wrap">
                    <el-input 
                        type="textarea" 
                        placeholder="请输入消息内容"
                        resize="none"
                        :autofocus="true"
                        :rows="4"
						v-model="messageBody"
                    ></el-input>
                </div>
                <div class="chat-send-message">
                    <el-button type="primary" @click="sendMessage('text')">发送</el-button>
                </div>
            </el-col>
        </el-row>
    </div>
</template>

<script>
    require('../assets/js/web-im/webim.config.js')
    require('../assets/js/web-im/strophe.js')
	require('../assets/js/web-im/websdk-1.4.13.js')
	require('../assets/js/web-im/adapter.js')
	require('../assets/js/web-im/webrtc-1.4.12.js')
	
	import MessageText from './message/text.vue'
	import MessageImage from './message/image.vue'

    const log = console.log.bind(console)

    export default {
        data() {
            return {
				webIM: null,
				rtcCall: null,
				messageBody: '',
				currentLoginUser: '',
                chatToolList: [
                    {
						text: '表情',
						type: 'emoji',
                        icon: require('../assets/images/video-chat-emoji.png'),
                    },
                    {
						text: '图片',
						type: 'image',
                        icon: require('../assets/images/video-chat-picture.png'),
                    },
                    // {
                    //     text: '视频',
                    //     icon: require('../assets/images/video-chat-video.png'),
                    // },
                    // {
					// 	text: '文件',
					// 	type: 'file',
                    //     icon: require('../assets/images/video-chat-file.png'),
                    // },
                    {
						text: '清空记录',
						type: 'clear',
                        icon: require('../assets/images/video-chat-clear.png'),
                    },
				],
				messageList: [
					{
						type: 'Text',
						from: 'master',
						body: {
							date: '2018-08-31 12:00:00',
							content: '大师在线',
							icon: require('../assets/images/master-detail-comment-user.jpg'),
						}
					},
					{
						type: 'Text',
						from: 'self',
						body: {
							date: '2018-08-31 12:00:00',
							content: '大师在线',
							icon: require('../assets/images/master-detail-comment-write-user.jpg'),
						}
					}
				],
				userIcon: require('../assets/images/master-detail-comment-write-user.jpg'),
				masterIcon: require('../assets/images/master-detail-comment-write-user.jpg'),
            }
		},
		components: {
			MessageText,
			MessageImage,
		},
		computed: {
			getSendUser() {
				return this.currentLoginUser === 'test1' ? 'test2' : 'test1'
			}
		},
        created() {
            // 创建链接
			this.createWebIM()
			// this.initRtcCall()
		},
		mounted() {
			// 监听图片选择框的改变
			let imageInput = document.querySelector('#image-input')

			imageInput.addEventListener('change', () => {
				if(imageInput.value || imageInput.files.length > 0) {
					this.sendMessage('image')
				}
			})
		},
        methods: {
			getScrollContainerHeight() {
				return document.querySelector('.message-scroll-container').offsetHeight
			},
            createWebIM() {
                this.webIM = new window.WebIM.connection({
                    isMultiLoginSessions: WebIM.config.isMultiLoginSessions,
                    https: typeof WebIM.config.https === 'boolean' ? WebIM.config.https : location.protocol === 'https:',
                    url: WebIM.config.xmppURL,
                    heartBeatWait: WebIM.config.heartBeatWait,
                    autoReconnectNumMax: WebIM.config.autoReconnectNumMax,
                    autoReconnectInterval: WebIM.config.autoReconnectInterval,
                    apiUrl: WebIM.config.apiURL,
                    isAutoLogin: true,
                })

                this.setCallback()
            },
            setCallback() {
                if(!this.webIM) {
                    console.error('im connect error')
                    return 
				}
				
				let _this = this

                this.webIM.listen({
                    onOpened(message) {
                        log('connect success')
						log(message)
						_this.initRtcCall()
					},
					onTextMessage(message) {
						log('recive text message')
						log(message)
						_this.pushMessageList({
							type: 'Text',
							from: 'master',
							body: {
								date: +new Date(),
								content: message.data,
								icon: _this.masterIcon,
							}
						})
					},
					onPictureMessage(message) {
						log('picture message')
						log(message)
						_this.pushMessageList({
							type: 'Image',
							from: 'master',
							body: {
								date: +new Date(),
								content: message.url,
								icon: _this.masterIcon,
							}
						})
					},
                    onClosed(message) {
                        log('connect closed')
                        log(message)
                    },
                    onError(msg) {
                        log('connect error')
                        log(msg)
                    }
                })
            },
            registerUser() {
                const opts = {
                    username: 'test2',
                    password: '123',
                    nickname: 'test2',
                    appKey: window.WebIM.config.appkey,
                    apiUrl: window.WebIM.config.apiURL,
                    success(msg) {
                        log('register im success')
                        log(msg)
                    },
                    error(err) {
                        log('register im fail')
                        log(err)
                    }
                }

                this.webIM.registerUser(opts)
            },
            loginUser() {
				this.$prompt('输入想要登陆的账号', '登陆').then(resp => {
					var opts = { 
						apiUrl: window.WebIM.config.apiURL,
						user: resp.value,
						pwd: '123',
						appKey: window.WebIM.config.appkey
					};

					this.webIM.open(opts);

					this.currentLoginUser = resp.value
				})
                
			},
			// 初始化实时音视频
			initRtcCall() {
				this.rtcCall = new window.WebIM.WebRTC.Call({
					connection: this.webIM,
					mediaStreamConstaints: {
						audio: true,
						video: true,
					},
					listener: {
						onAcceptCall(from, opts) {
							console.log('onAcceptCall::', 'from: ', from, 'options: ', options)
						},
						//通过streamType区分视频流和音频流，streamType: 'VOICE'(音频流)，'VIDEO'(视频流)
						onGotRemoteStream: function (stream, streamType) {
							console.log('onGotRemoteStream::', 'stream: ', stream, 'streamType: ', streamType)
							// var video = document.getElementById('video')
							// video.srcObject = stream
						},
						onGotLocalStream: function (stream, streamType) {
							console.log('onGotLocalStream::', 'stream:', stream, 'streamType: ', streamType)
							// var video = document.getElementById('localVideo')
							// video.srcObject = stream
						},
						onRinging: function (caller) {
							console.log('onRinging::', 'caller:', caller)
						},
						onTermCall: function (reason) {
							console.log('onTermCall::')
							console.log('reason:', reason)
						},
						onIceConnectionStateChange: function (iceState) {
							console.log('onIceConnectionStateChange::', 'iceState:', iceState)
						},
						onError: function (e) {
							console.log(e)
						}
					}
				})
			},
			// 将消息推入消息列表
			pushMessageList(obj) {
				this.messageList.push(obj)
				this.$nextTick(() => {
					let opts = {
						behavior: 'smooth',
						block: 'end',
					}

					let messageDom = document.querySelector('.message-scroll-container > div:last-child')

					if(obj.type === 'Image') {
						let img = new Image()

						img.onload = function() {
							messageDom.scrollIntoView(opts)
							img = null
						}

						img.src = obj.body.content
					} else {
						messageDom.scrollIntoView(opts)
					}
				})
			},
			// 发送附件
			selectMessageType(type) {
				if(type === 'image') {
					let imageInput = document.querySelector('#image-input')

					imageInput.click()
				} else if(type === 'video') {
					this.rtcCall.caller = this.currentLoginUser
					this.rtcCall.makeVideoCall(this.getSendUser)
				} else if(type === 'clear') {
					this.messageList = []
				}
			},
			// 收集文本消息
			formatTextMessage() {
				if(!this.messageBody) {
					this.$message.error('请输入消息内容')
					return 
				}

				var id = this.webIM.getUniqueId()
				var msg = new WebIM.message('txt', id)
				let _this = this

				msg.set({
					msg: this.messageBody,
					to: _this.getSendUser,
					roomType: false,
					chatType: 'singleChat',
					success: function (id, serverMsgId) {
						log('send text message success')
						log(id, serverMsgId)

						_this.pushMessageList({
							type: 'Text',
							from: 'self',
							body: {
								date: +new Date(),
								content: _this.messageBody,
								icon: _this.userIcon,
							}
						})

						_this.messageBody = ''
					},
					fail: function(e){
						console.log("Send private text error")
					}
				})

				return msg
			},
			// 发送图片信息
			formatImageMessage() {
				console.log('images times')
				var id = this.webIM.getUniqueId()                   // 生成本地消息id
				var msg = new WebIM.message('img', id)        // 创建图片消息
				var input = document.getElementById('image-input')  // 选择图片的input
				var file = WebIM.utils.getFileUrl(input)      // 将图片转化为二进制文件
				var allowType = {
					'jpg': true,
					'gif': true,
					'png': true,
					'bmp': true
				}
				let _this = this

				if (file.filetype.toLowerCase() in allowType) {
					var option = {
						apiUrl: WebIM.config.apiURL,
						file: file,
						to: _this.getSendUser,                       // 接收消息对象
						roomType: false,
						chatType: 'singleChat',
						onFileUploadError: function () {      // 消息上传失败
							console.log('onFileUploadError')
						},
						onFileUploadComplete: function () {   // 消息上传成功
							console.log('onFileUploadComplete')
						},
						success: function () {                // 消息发送成功
							console.log('Success')
							_this.pushMessageList({
								type: 'Image',
								from: 'self',
								body: {
									date: +new Date(),
									content: file.url,
									icon: _this.userIcon,
								}
							})

							_this.$nextTick(_ => {
								input.value = ''
								input.files = null
							})
						},
						flashUpload: WebIM.flashUpload
					}

					msg.set(option)
					return msg
				} else {
					this.$message.error('不支持的图片类型')
				}
			},
            // 发送消息
            sendMessage(type) {
				let messageGroup = {
					text: 'formatTextMessage',
					image: 'formatImageMessage',
				}
				let message = this[messageGroup[type]]()

				if(message) {
					this.webIM.send(message.body)
				}
            },
        }
    }
</script>

<style lang="stylus" scoped>

    @keyframes scale-btn {
        0% {
            transform scale(1)
        }
        50% {
            transform scale(1.4)
        }
        100% {
            transform scale(1)
        }
    }

	.hidden-input
		display: none

	.video-chat-wrap
        width 100%
        height 560px

        .message-wrap
            height 380px
            overflow auto
            border-bottom 1px solid #cccccc

            .message-scroll-container
                height auto  
        
        .message-tool
            height 170px

            .chat-tool-wrap,
            .chat-send-message
                height 30px
            
            .chat-input-wrap
                height 110px

            .chat-send-message
                text-align right
            
            .chat-tool-wrap
                display flex
                justify-content space-between
                align-items center

                > div 
                    display flex
                    align-items center
                
            .chat-tool-icon
                width 20px
                height 20px
                margin-right 20px
                cursor pointer
                flex-grow 1

                &.primary 
                    animation scale-btn 1s ease infinite
    

</style>

