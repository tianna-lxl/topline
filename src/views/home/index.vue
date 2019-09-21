<template>
  <div class="home">
    <!-- 导航栏 -->
    <van-nav-bar title="首页"></van-nav-bar>
    <!-- 导航栏 -->

    <!-- 频道列表 -->
    <van-tabs v-model="active">
      <van-tab v-for="item in channels" :key="item.id" :title="item.name">
        <!-- 文章列表 -->
        <van-pull-refresh v-model="channels[active].pullDownLoading" @refresh="onRefresh">
          <van-list
          v-model="channels[active].loading"
          :finished="channels[active].finished"
          finished-text="没有更多了"
          @load="onLoad">
            <van-cell
            v-for="(item, index) in channels[active].articles"
            :key="index"
            :title="item.title"
            >
              <div slot="label">
                <van-grid :border="false" :column-num="3">
                  <van-grid-item v-for="(img, index) in channels[active].articles[0].cover.images" :key="index">
                    <van-image height="80" :src="img" />
                  </van-grid-item>
                </van-grid>
                <div class="article-info">
                  <div class="meta">
                    <span>{{channels[active].articles.aut_name}}</span>
                    <span>{{channels[active].articles.comm_count}}评论</span>
                    <span>{{channels[active].articles.pubdate}}</span>
                  </div>
                </div>
              </div>
            </van-cell>
          </van-list>
        </van-pull-refresh>
        <!-- 文章列表 -->
      </van-tab>
    </van-tabs>
    <!-- 频道列表 -->
  </div>
</template>

<script>
import { getAllChannels } from '@/api/channels'
import { getArticles } from '@/api/article'
export default {
  name: 'HomeIndex',
  data () {
    return {
      active: 0,
      channels: [],
      list: [],
      loading: false,
      finished: false
    }
  },
  computed: {
    currentChannel () {
      return this.channels[this.active]
    }
  },
  methods: {
    async loadAllChannels () {
      let { data } = await getAllChannels()
      data.data.channels.forEach(item => {
        item.articles = []
        item.loading = false
        item.finished = false
        item.timestamp = null
        item.pullDownLoading = false
      })
      this.channels = data.data.channels
    },
    async onLoad () {
      const currentChannel = this.currentChannel
      let { data } = await getArticles({
        channelId: currentChannel.id,
        timestamp: currentChannel.timestamp || Date.now(),
        withTop: 1
      })

      const { pre_timestamp: preTimestamp, results } = data.data
      currentChannel.articles.push(...results)
      currentChannel.loading = false
      if (!preTimestamp) {
        currentChannel.finished = true
      } else {
        currentChannel.timestamp = preTimestamp
      }
    },
    // 下拉刷新
    async onRefresh () {
      const currentChannel = this.currentChannel
      const { data } = await getArticles({
        channelId: currentChannel.id,
        timestamp: Date.now(),
        withTop: 1
      })
      currentChannel.articles.unshift(...data.data.results)
      currentChannel.pullDownLoading = false
      this.$toast('刷新成功')
    }
  },
  created () {
    this.loadAllChannels()
  }
}
</script>

<style lang="less">
.home {
  .van-tabs {
    .van-tabs__content {
      margin-bottom: 50px;
    }
  }
}
</style>
