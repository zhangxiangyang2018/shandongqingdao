<template>
  <div>
    <!--
    * @FileDescription: 高空分析图
    * @Author: 张向阳
    * @Date: 2021/4/20
    * @LastEditors:  张向阳
    * @LastEditTime: 2021/4/20
    
    -->
    <div class="Highaltitudeanalysis">
      <div class="header">高空分析图</div>
      <div class="content">
        <div class="leftbar">
          <el-scrollbar style="height: 100%">
            <div style="height: 900px">
              <!-- 时间选择 -->
              <div class="Timeselection">
                <div class="headerline">
                  <el-date-picker
                    v-model="dateVal"
                    type="date"
                    size="mini"
                    placeholder="选择日期"
                    style="width: 70%"
                  >
                  </el-date-picker>
                  <el-select
                    v-model="dayVal"
                    placeholder="请选择"
                    size="mini"
                    style="width: 20%; margin-left: 10px"
                  >
                    <el-option> </el-option>
                  </el-select>
                </div>

                <div class="main">
                  <div
                    :class="item.name == timeVal ? 'itemActive' : 'item'"
                    v-for="(item, index) in timeArr"
                    :key="index"
                    @click="timeSwitch(item)"
                  >
                    <div class="btn">
                      <i :class="item.icon"></i>
                    </div>
                    <div class="label">{{ item.name }}</div>
                  </div>
                </div>
              </div>
              <!-- 层次选择 -->
              <div class="level">
                <span class="label"> 层次选择: </span>
                <el-select placeholder="请选择" size="mini" style="width: 70%">
                </el-select>
              </div>
              <!-- 内容分析 -->
              <div class="contentAnalysis">
                <div class="title">内容分析</div>
                <div class="content">
                  <div class="item">
                    <el-checkbox label="等高线"></el-checkbox>
                  </div>
                  <div class="item">
                    <el-checkbox label="等温线"></el-checkbox>
                  </div>
                  <div class="item">
                    <el-checkbox label="24小时变高"></el-checkbox>
                  </div>

                  <div class="item">
                    <el-checkbox label="T-Td <3°C"></el-checkbox>
                  </div>
                  <div class="item">
                    <el-checkbox label="高空急流"></el-checkbox>
                  </div>
                </div>
              </div>
              <!-- 图层管理面板 -->
              <div class="layerPanel">
                <div class="title">
                  <span>图层管理面板</span>
                  <el-switch
                    active-color="#13ce66"
                    inactive-color="#ff4949"
                    size="mini"
                  >
                  </el-switch>
                </div>
                <div class="content">
                  <el-select size="mini" placeholder="请选择"> </el-select>
                </div>
              </div>
              <!-- 要素选择 -->
              <div class="factorSelection">
                <div class="title">
                  <span>要素选择</span>
                  <el-switch
                    active-color="#13ce66"
                    inactive-color="#ff4949"
                    size="mini"
                  >
                  </el-switch>
                </div>
                <div class="main">
                  <div class="item">WD..</div>
                    <div class="item">TT</div>
                      <div class="item">T-Td</div>
                        <div class="item">H</div>
                </div>
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

import "@mapbox/mapbox-gl-draw/dist/mapbox-gl-draw.css";
mapboxgl.accessToken =
  "pk.eyJ1IjoibWFvcmV5IiwiYSI6ImNqNWhrenIwcDFvbXUyd3I2bTJxYzZ4em8ifQ.KHZIehQuWW9AsMaGtATdwA";
export default {
  data() {
    return {
      map: null, //地图对象
      dateVal: "", //时间选择
      dayVal: "", // 日期选择
      timeArr: [
        {
          name: "前一天",
          icon: "el-icon-d-arrow-left",
        },
        {
          name: "前一时次",
          icon: "el-icon-arrow-left",
        },
        {
          name: "当前",
          icon: "el-icon-place",
        },
        {
          name: "后一时次",
          icon: "el-icon-arrow-right",
        },
        {
          name: "后一天",
          icon: "el-icon-d-arrow-right",
        },
      ], //时间切换列表
      timeVal: "前一天",
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
    //时间切换
    timeSwitch(item) {
      this.timeVal = item.name;
    },
  },
};
</script>
<style lang="scss" scoped>
@import url("https://api.tiles.mapbox.com/mapbox-gl-js/v0.44.2/mapbox-gl.css");
::v-deep a.mapboxgl-ctrl-logo {
  display: none;
}
.Highaltitudeanalysis {
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
      .Timeselection {
        width: 100%;
        height: 150px;
        border: 0.1px solid #9b9b9b;
        .headerline {
          height: 40px;
          line-height: 40px;
          padding-left: 10px;

          background: #efefef;
        }
        .main {
          height: 110px;
          display: flex;
          justify-content: space-around;
          .item {
            width: 40px;
            height: 70px;
            cursor: pointer;
            .btn {
              width: 30px;
              height: 30px;
              background: rgb(238, 238, 238);
              display: flex;
              justify-content: space-around;
              align-items: center;
              i {
                font-size: 13px;
              }
              margin: 5px auto;
            }
            .label {
              font-size: 12px;
              text-align: center;
              color: #9b9b9b;
            }
          }

          .itemActive {
            width: 40px;
            height: 70px;
            cursor: pointer;
            .btn {
              width: 30px;
              height: 30px;
              background: rgb(39, 169, 227);
              display: flex;
              justify-content: space-around;
              align-items: center;
              i {
                font-size: 13px;
                font-weight: 700;
                color: #fff;
              }
              margin: 5px auto;
            }
            .label {
              font-size: 12px;
              text-align: center;
              color: #9b9b9b;
            }
          }
        }
      }
      .level {
        height: 40px;
        line-height: 40px;
        padding-left: 10px;
        background: #efefef;
        margin-top: 10px;
        border: 0.1px solid #9b9b9b;
        .label {
          font-size: 13px;
        }
      }
      .contentAnalysis {
        width: 100%;
        height: 150px;
        border: 0.1px solid #9b9b9b;
        margin-top: 10px;
        .title {
          height: 40px;
          line-height: 40px;
          padding-left: 10px;
          background: #efefef;
          font-size: 13px;
        }
        .content {
          width: 100%;
          height: 110px;
          display: flex;
          justify-content: flex-start;
          align-content: flex-start;

          flex-wrap: wrap;
          .item {
            width: 90px;
            height: 20px;
            margin: 5px;
          }
        }
      }
      .layerPanel {
        width: 100%;
        height: 100px;
        border: 0.1px solid #9b9b9b;
        margin-top: 10px;
        .title {
          span {
            display: block;
            width: 80%;
          }
          height: 40px;
          line-height: 40px;
          padding: 0 10px;
          background: #efefef;
          font-size: 13px;
          display: flex;
          justify-content: flex-start;
          align-items: center;
        }
        .content {
          width: 100%;
          height: 50px;
          text-align: center;
          padding: 10px;
        }
      }
      .factorSelection {
        width: 100%;
        height: 150px;
        border: 0.1px solid #9b9b9b;
        margin-top: 10px;
        .title {
          span {
            display: block;
            width: 80%;
          }
          height: 40px;
          line-height: 40px;
          padding: 0 10px;
          background: #efefef;
          font-size: 13px;
          display: flex;
          justify-content: flex-start;
          align-items: center;
        }
        .main {
          width: 100%;
          height: 110px;
          display: -webkit-box;
          display: -ms-flexbox;
          display: flex;
          -webkit-box-pack: start;
          -ms-flex-pack: start;
          justify-content: flex-start;
          -ms-flex-line-pack: start;
          align-content: flex-start;
          -ms-flex-wrap: wrap;
          flex-wrap: wrap;
          .item {
            width: 60px;
            height: 30px;
            line-height: 30px;
            text-align: center;
            background: #efefef;
            font-size: 13px;
            border: 0.1px solid #9b9b9b;
            color: #9b9b9b;
            cursor: pointer;
            margin: 5px ;
          }
        }
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