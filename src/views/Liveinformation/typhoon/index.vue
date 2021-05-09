<template>
  <div class="typhoon">
    <!--
    * @FileDescription: 台风信息
    * @Author: 张向阳
    * @Date: 2021/4/20
    * @LastEditors:  张向阳
    * @LastEditTime: 2021/4/20
    
    -->

    <div class="left">
        <div class="titleLine">
            <marquee>
                <span id="scrollcontent">
                    2020年第20号台风 艾莎尼（Atsani） 时间：10月29日  风速：33m/s  移速：  气压：  中心最大风力：
                </span>
            </marquee> 
        </div>
      <div id="map" style="width: 100%; height: 100%"></div>
    </div>
    <div class="right">
      <div class="header">
        <span>台风列表</span>

        <span style="float: right; width: 150px">
          时间:
          <el-date-picker
            style="width: 70%"
            size="mini"
            v-model="value1"
            type="date"
            placeholder="选择日期"
          >
          </el-date-picker>
        </span>
      </div>
      <div>
        <el-table :data="tableData" border style="width: 100%" size="mini">
          <el-table-column type="selection" width="55"> </el-table-column>
          <el-table-column label="编号">
            <template slot-scope="scope">
              <!-- <el-checkbox v-model="checked">{{scope.row.name}}</el-checkbox> -->
              <span>
                  {{scope.row.name}}
              </span>
            </template>
          </el-table-column>
          <el-table-column prop="chinesename" label="中文名"> </el-table-column>

          <el-table-column prop="englishname" label="英文名"> </el-table-column>

          <el-table-column prop="date" label="生成日期"> </el-table-column>
        </el-table>
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
      tableData: [
        {
          name: "2001",
          chinesename: "黄蜂",
          englishname: "Vongfong",
          date: "2001-09-10",
        },
        {
          name: "2002",
          chinesename: "鹦鹉",
          englishname: "Nuri",
          date: "2002-09-10",
        },
      ],
      checked: [],
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
        style: "mapbox://styles/mapbox/satellite-streets-v10",
        center: [120.39629, 36.30744],
        zoom: 9,
        attributionControl: false,
      }));
      map.on("load", () => {});
    },
  },
};
</script>
<style lang="scss" scoped>
@import url("https://api.tiles.mapbox.com/mapbox-gl-js/v0.44.2/mapbox-gl.css");
::v-deep a.mapboxgl-ctrl-logo {
  display: none;
}
.typhoon {
  width: 100%;
  height: 100%;

  position: absolute;
  .left {
    position: absolute;
    left: 0;
    top: 0;
    width: 65%;
    height: 100%;
    .titleLine  {
        position:absolute;
        left: 0;
        top:0;
        width:100%;
        height: 60px;
        background:rgb(0,0,0,0.3);
        z-index: 2000;
        #scrollcontent  {
            color: #fff;
            line-height: 60px;
            color: #fff;
        }
    }
  }
  .right {
    position: absolute;
    right: 0;
    top: 0;
    width: 35%;
    height: 100%;
    padding: 10px;

    .header {
      height: 60px;
      font-size: 13px;
    }
  }
}
</style>