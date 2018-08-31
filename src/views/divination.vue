<template>
	<div class="divination-wrap">
		<el-button @click="showVideoChatDialog">视频</el-button>
		<el-dialog
			:visible.sync="videoChatDialogVisible"
			width="700px"
		>
			<VideoChat />
		</el-dialog>
	</div>
</template>

<script>

	import VideoChat from '../components/videoChat.vue'

	export default {
		data() {
			return {
				videoChatDialogVisible: false,
			}
		},
		components: {
			VideoChat,
		},
		methods: {
			toggleVideoChatDialog() {
				this.videoChatDialogVisible = !this.videoChatDialogVisible
			},
			showVideoChatDialog() {
				this.toggleVideoChatDialog()
			}
		}
	}
</script>

<style lang="stylus" scoped>
	
</style>

