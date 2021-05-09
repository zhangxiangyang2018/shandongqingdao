<template>
  <div>
    <!--
    * @FileDescription: 天气系统回顾
    * @Author: 张向阳
    * @Date: 2021/4/21
    * @LastEditors:  张向阳
    * @LastEditTime: 2021/4/21
    
    -->
    <div class="Reviewoweathersystem">
      <div class="header">天气系统回顾</div>
      <div class="content">
        <div class="leftbar">
          <el-scrollbar style="height: 100%">
            <div style="height: 900px">
              <div class="duringtime">
                <div class="title">日期范围</div>
                <div class="main">
                  <div class="item">
                    <span>起:</span>
                    <el-date-picker
                      size="mini"
                      style="width: 80%"
                      type="date"
                      placeholder="选择日期"
                    >
                    </el-date-picker>
                  </div>
                  <div class="item">
                    <span>止:</span>
                    <el-date-picker
                      size="mini"
                      style="width: 80%"
                      type="date"
                      placeholder="选择日期"
                    >
                    </el-date-picker>
                  </div>
                </div>
              </div>
              <!-- 天气系统 -->
              <div class="daysystem">
                <div class="title">天气系统</div>
                <div class="main">
                  <el-select placeholder="请选择" size="mini"> </el-select>
                </div>
              </div>
              <!-- 系统时间 -->
              <div class="systemteime">
                <div class="title">系统时间</div>
                <div class="main">
                  <el-select placeholder="请选择" size="mini"> </el-select>
                </div>
              </div>
              <!-- 资料模式 -->
              <div class="dataMode">
                <div class="title">资料模式</div>
                <div class="main">
                  <el-select placeholder="请选择" size="mini"> </el-select>
                </div>
              </div>
              <!-- 起报时间 -->

              <div class="detonationTime">
                <div class="title">起报时间</div>
                <div class="main">
                  <el-radio label="1">00时</el-radio>
                  <el-radio label="2">12时</el-radio>
                </div>
              </div>

              <!-- 层次要素 -->
              <div class="dataMode">
                <div class="title">层次要素</div>
                <div class="main">
                  <el-select
                    placeholder="请选择"
                    size="mini"
                    style="width: 49%"
                  >
                  </el-select>
                  <el-select
                    placeholder="请选择"
                    size="mini"
                    style="width: 49%"
                  >
                  </el-select>
                </div>
              </div>

              <div class="dataMode">
                <div class="title">卫星云图</div>
                <div class="main">
                  <el-select placeholder="请选择" size="mini"> </el-select>
                </div>
              </div>

              <div class="dataMode">
                <div class="title">雷达回波</div>
                <div class="main">
                  <el-select placeholder="请选择" size="mini"> </el-select>
                </div>
              </div>

              <div class="container">
                    <el-button size="mini">地面</el-button>
                      <el-button size="mini">高空</el-button>
              </div>
              <div  class="container">
                   <el-button size="mini">上一时次</el-button>
                      <el-button size="mini">下一时次</el-button>
              </div>
            </div>
          </el-scrollbar>
        </div>

        <div class="rightBar">
          <div class="map" style="width: 100%; height: 100%" id="map"></div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import mapboxgl from "mapbox-gl";

mapboxgl.accessToken =
  "pk.eyJ1IjoibWFvcmV5IiwiYSI6ImNqNWhrenIwcDFvbXUyd3I2bTJxYzZ4em8ifQ.KHZIehQuWW9AsMaGtATdwA";
export default {
  data() {
    return {
      map: null, //地图对象
      draw: null, // 绘图对象
    };
  },
  mounted() {
    this.initMap();
  },
  beforeDestroy() {
    if (this.map) {
      this.map.remove();
    }
  },
  watch: {
    // 菜单栏切换重新resize 地图
    "$store.state.app.sidebar.opened": function () {
      if (this.map) {
        setTimeout(() => {
          this.map.resize();
        }, 500);
      }
    },
  },
  methods: {
    // 初始化地图
    initMap() {
      var map = (this.map = new mapboxgl.Map({
        container: "map",
        style: "mapbox://styles/mapbox/navigation-guidance-night-v2",
        center: [120.39629, 36.30744],
        zoom: 9,
        attributionControl: false,
      }));
      map.on("load", () => {});
    },
    // 绘制航线
    drawLines() {},
  },
};
</script>
<style lang="scss" scoped>
@import url("https://api.tiles.mapbox.com/mapbox-gl-js/v0.44.2/mapbox-gl.css");
::v-deep a.mapboxgl-ctrl-logo {
  display: none;
}
.Reviewoweathersystem {
  .header {
    height: 50px;
    width: 100%;
    line-height: 50px;
    padding-left: 30px;
    color: rgba(155, 155, 155);
    border-bottom: 0.1px solid rgb(155, 155, 155);
    font-size: 14px;
  }
  .content {
    .leftbar {
      padding: 15px;
      width: 259px;
      height: calc(100vh - 134px);
      ::v-deep .el-scrollbar__wrap {
        overflow-x: hidden;
      }
      .duringtime {
        width: 100%;
        height: 150px;
        border: 0.1px solid #9b9b9b;
        .title {
          height: 40px;
          line-height: 40px;
          padding-left: 10px;
          background: #efefef;
          font-size: 13px;
        }
        .main {
          height: 110px;
          width: 100%;
          .item {
            span {
              color: #ccc;
              font-size: 13px;
              margin-right: 10px;
            }
            height: 40px;
            line-height: 40px;
            padding: 0 10px;
          }
        }
      }
      .daysystem {
        width: 100%;
        height: 90px;
        margin-top: 10px;
        border: 0.1px solid #9b9b9b;
        .title {
          height: 40px;
          line-height: 40px;
          padding-left: 10px;
          background: #efefef;
          font-size: 13px;
        }
        .main {
          height: 50px;
          text-align: center;
          padding: 10px 0;
        }
      }

      .systemteime {
        width: 100%;
        height: 90px;
        margin-top: 10px;
        border: 0.1px solid #9b9b9b;
        .title {
          height: 40px;
          line-height: 40px;
          padding-left: 10px;
          background: #efefef;
          font-size: 13px;
        }
        .main {
          height: 50px;
          text-align: center;
          padding: 10px 0;
        }
      }

      .dataMode {
        width: 100%;
        height: 90px;
        margin-top: 10px;
        border: 0.1px solid #9b9b9b;
        .title {
          height: 40px;
          line-height: 40px;
          padding-left: 10px;
          background: #efefef;
          font-size: 13px;
        }
        .main {
          height: 50px;
          text-align: center;
          padding: 10px 0;
        }
      }

      .detonationTime {
        width: 100%;
        height: 150px;
        margin-top: 10px;
        border: 0.1px solid #9b9b9b;
        .title {
          height: 40px;
          line-height: 40px;
          padding-left: 10px;
          background: #efefef;
          font-size: 13px;
        }
        .main {
          height: 50px;
          padding: 10px;
        }
      }
      .container  {
          display: flex;
          justify-content: space-between;
          height: 30px;
          margin: 10px;
      }
    }
    .rightBar {
      width: calc(100% - 259px);
      height: calc(100vh - 130px);
      position: absolute;
      top: 50px;
      right: 0;
    }
  }
}
</style>