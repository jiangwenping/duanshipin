<template>
  <el-row class="panel-group">
    <el-col class="card-panel-col">
      <div class="card-panel">
        <div class="card-panel-icon-wrapper icon-people">
          <svg-icon class-name="card-panel-icon" icon-class="peoples"/>
        </div>
        <div class="card-panel-description">
          <count-to :duration="2600" :end-val="3" :start-val="0" class="card-panel-num"/>
          <div class="card-panel-text">
            账号总数
          </div>
        </div>
        <div class="card-panel-description">
          <count-to :duration="3000" :end-val="81212" :start-val="0" class="card-panel-num"/>
          <div class="card-panel-text">
            视频总数
          </div>
        </div>
        <div class="card-panel-description">
          <count-to :duration="3200" :end-val="9280" :start-val="0" class="card-panel-num"/>
          <div class="card-panel-text">
            粉丝总数
          </div>
        </div>
        <div class="card-panel-description">
          <count-to :duration="3600" :end-val="13600" :start-val="0" class="card-panel-num"/>
          <div class="card-panel-text">
            点赞总数
          </div>
        </div>
      </div>
    </el-col>
  </el-row>
</template>
<script>
import CountTo from 'vue-count-to'

export default {
  components: {
    CountTo
  },
  methods: {
  }
}
</script>

<style lang="scss" scoped>
.panel-group {
  margin-top: -10px;

  .card-panel-col {
    margin-bottom: 20px;
  }

  .card-panel {
    height: 108px;
    cursor: pointer;
    font-size: 10px;
    position: relative;
    overflow: hidden;
    color: #666;
    background: #fff;
    box-shadow: 4px 4px 40px rgba(0, 0, 0, .05);
    border-color: rgba(0, 0, 0, .05);

    &:hover {
      .card-panel-icon-wrapper {
        color: #fff;
      }

      .icon-people {
        background: #40c9c6;
      }

      .icon-message {
        background: #36a3f7;
      }

      .icon-money {
        background: #f4516c;
      }

      .icon-shopping {
        background: #34bfa3
      }
    }

    .icon-people {
      color: #40c9c6;
    }

    .icon-message {
      color: #36a3f7;
    }

    .icon-money {
      color: #f4516c;
    }

    .icon-shopping {
      color: #34bfa3
    }

    .card-panel-icon-wrapper {
      float: left;
      margin: 14px 0 0 14px;
      padding: 16px;
      transition: all 0.38s ease-out;
      border-radius: 6px;
    }

    .card-panel-icon {
      float: left;
      font-size: 48px;
    }

    .card-panel-description {
      float: right;
      font-weight: bold;
      margin: 35px;

      .card-panel-text {
        line-height: 35px;
        color: rgba(0, 0, 0, 0.45);
        font-size: 14px;
      }

      .card-panel-num {
        font-size: 20px;
      }
    }
  }
}

@media (max-width: 550px) {
  .card-panel-description {
    display: none;
  }

  .card-panel-icon-wrapper {
    float: none !important;
    width: 100%;
    height: 100%;
    margin: 0 !important;

    .svg-icon {
      display: block;
      margin: 14px auto !important;
      float: none !important;
    }
  }
}
</style>
