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
                    <!-- <div class="message-container">

                    </div> -->
                    <div class="message-item-line master">
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
                    </div>
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
                        >
                    </div>
                    <div class="video-btn">
                        <img class="chat-tool-icon primary" src="../assets/images/video-chat-video.png" alt="视频通话" title="视频通话">
                    </div>
                </div>
                <div class="chat-input-wrap">
                    <el-input 
                        type="textarea" 
                        placeholder="请输入消息内容"
                        resize="none"
                        :autofocus="true"
                        :rows="4"
                    ></el-input>
                </div>
                <div class="chat-send-message">
                    <el-button type="primary">发送</el-button>
                </div>
            </el-col>
        </el-row>
    </div>
</template>

<script>
    require('../assets/js/web-im/webim.config.js');
    require('../assets/js/web-im/strophe.js');
    require('../assets/js/web-im/websdk-1.4.13.js');

    const log = console.log.bind(console)

    export default {
        data() {
            return {
                webIM: null,
                chatToolList: [
                    {
                        text: '表情',
                        icon: require('../assets/images/video-chat-emoji.png'),
                    },
                    {
                        text: '图片',
                        icon: require('../assets/images/video-chat-picture.png'),
                    },
                    // {
                    //     text: '视频',
                    //     icon: require('../assets/images/video-chat-video.png'),
                    // },
                    {
                        text: '文件',
                        icon: require('../assets/images/video-chat-file.png'),
                    },
                    {
                        text: '清空记录',
                        icon: require('../assets/images/video-chat-clear.png'),
                    },
                ]
            }
        },
        created() {
            // 创建链接
            this.createWebIM()
        },
        methods: {
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

                this.webIM.listen({
                    onOpened(message) {
                        log('connect success')
                        log(message)
                    },
                    onClosed(message) {
                        log('connect closed')
                        log(message)
                    },
                    onError(meg) {
                        log('connect error')
                        log(msg)
                    }
                })
            },
            registerUser() {
                const opts = {
                    username: 'test1',
                    password: '123',
                    nickname: 'test1',
                    appKey: window.WebIM.config.appkey,
                    apiUrl: window.WebIM.config.apiUrl,
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
                var opts = { 
                    apiUrl: window.WebIM.config.apiURL,
                    user: 'test1',
                    pwd: '123',
                    appKey: window.WebIM.config.appkey
                };

                this.webIM.open(opts);
            }
        }
    }
</script>

<style lang="stylus" scoped>
    .video-chat-wrap
        width 100%
        height 560px

        .message-wrap
            height 380px
            overflow auto
            border-bottom 1px solid #cccccc

            .message-scroll-container
                height auto  

                .message-item-line 
                    display flex
                    align-items center
                    margin-bottom 20px

                    .head-sculpture 
                        align-self flex-start
                        width 40px
                        height 40px

                    &.master
                        justify-content flex-start
                        text-align left

                        .head-sculpture 
                            margin-right 10px

                        .message-body 
                            align-items flex-start

                            div 
                                background-color #5d3c3a

                    &.self
                        justify-content flex-end
                        text-align right

                        .head-sculpture 
                            margin-left 10px

                        .message-body 
                            align-items flex-end

                            div 
                                background-color rgb(54, 153, 255)

                    .message-body
                        max-width 400px
                        height auto 
                        text-align left
                        display flex
                        flex-direction column
                        justify-content center
                        color #ffffff

                        p 
                            text-align left
                            color #2c3e50

                        div 
                            display inline-block
                            max-width 100%
                            border-radius 4px
                            height auto 
                            line-height 1.6
                            padding 4px 10px  
                            margin-top 10px
        
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

</style>

