<template>
  <div>
    <!--
    * @FileDescription: 数值预报综合
    * @Author: 张向阳
    * @Date: 2021/4/20
    * @LastEditors:  张向阳
    * @LastEditTime: 2021/4/20
    
    -->
    <div class="Forecastsynthesis">
      <div class="header">数值预报综合</div>
      <div class="content">
        <div class="leftbar">
          <el-scrollbar style="height: 100%">
            <div style="height: 900px">
              <div>
                <div class="mode">
                  <span class="label">日期时间:</span>

                  <el-date-picker
                    v-model="dateTime"
                    type="date"
                    size="mini"
                    style="width: 65%"
                    value-format="yyyy-MM-dd"
                    format="yyyy-MM-dd"
                    placeholder="选择日期"
                    @change="pickdateTime()"
                  >
                  </el-date-picker>
                </div>

                <div class="mode">
                  <span class="label">起报时间:</span>

                  <el-select
                    v-model="StartingReportTime"
                    placeholder="请选择"
                    size="mini"
                    style="width: 65%"
                    @change="pickStartingReportTime()"
                  >
                    <el-option
                      v-for="item in StartingReportTimelist"
                      :key="item.value"
                      :label="item.name"
                      :value="item.value"
                    >
                    </el-option>
                  </el-select>
                </div>
                <!-- 预报模式 -->
                <div class="mode">
                  <span class="label">预报模式:</span>
                  <el-select
                    v-model="modevalue"
                    placeholder="请选择"
                    size="mini"
                    style="width: 65%"
                    @change="Forecastmodelchange(modevalue)"
                  >
                    <el-option
                      v-for="(item, index) in Forecastmodel"
                      :key="index"
                      :label="item.name"
                      :value="item.id"
                    >
                    </el-option>
                  </el-select>
                </div>

                <!-- 预报层次 -->
                <div class="mode">
                  <span class="label">预报层次:</span>
                  <el-select
                    v-model="ForecastleveVal"
                    placeholder="请选择"
                    size="mini"
                    style="width: 65%"
                    @change="pickForecastleveVal"
                  >
                    <el-option
                      v-for="(item, index) in Forecastleve"
                      :key="index"
                      :label="item.name"
                      :value="item.vaule"
                    >
                    </el-option>
                  </el-select>
                </div>
                <!-- 预报时效 -->
                <div class="Forecasttimeliness">
                  <div class="title">
                    预报时效:
                    <el-select
                      v-model="Forecastvalue"
                      placeholder="请选择"
                      size="mini"
                      style="width: 67%"
                      @change="pickForecastvalue"
                    >
                      <el-option
                        v-for="(item, index) in startingReport"
                        :key="index"
                        :label="item.name"
                        :value="item.value"
                      >
                      </el-option>
                    </el-select>
                  </div>
                </div>

                <div class="mode" style="margin: 10px 0">
                  <span class="label">预报要素:</span>
                  <el-select
                    v-model="Forecastelementval"
                    placeholder="请选择"
                    size="mini"
                    style="width: 65%"
                    @change="pickForecastelementval"
                  >
                    <el-option
                      v-for="(item, index) in Forecastelements"
                      :key="index"
                      :label="item.name"
                      :value="item.name_en"
                    >
                    </el-option>
                  </el-select>
                </div>

                <!-- 图层管理面板 -->
                <div class="plane">
                  <div class="title">
                    <span class="label">图层面板管理</span>
                    <el-switch
                      v-model="planestate"
                      active-color="#13ce66"
                      inactive-color="#ff4949"
                      size="mini"
                      @change="tabPlane"
                      style="float: right; margin-top: 10px"
                    >
                    </el-switch>
                  </div>

                  <div class="main" id="planecontent">
                    <el-scrollbar style="height: 100%">
                      <div class="content">
                        <!-- 图层列表 -->
                        <ul class="layerList">
                          <li
                            v-for="(item, index) in layerList"
                            :key="index"
                            @click="currentlayer(item)"
                          >
                            <el-tooltip
                              class="item"
                              effect="dark"
                              :content="item.description"
                              placement="top-start"
                            >
                              <span
                                :class="
                                  layeritem.id == item.id
                                    ? 'spanActive'
                                    : 'spanItem'
                                "
                                >{{ index + 1 }}.{{ item.description }}</span
                              >
                            </el-tooltip>
                            <el-button size="mini" @click="showDisplay(item)">
                              <img
                                :src="
                                  item.isShow == true
                                    ? require('../images/show.png')
                                    : require('../images/hide.png')
                                "
                                alt=""
                                style="width: 14px; height: 14px"
                              />
                            </el-button>
                            <el-button
                              icon="el-icon-delete"
                              size="mini"
                              @click="delDisplay(item)"
                            ></el-button>
                          </li>
                        </ul>
                      </div>
                    </el-scrollbar>
                  </div>
                </div>
                <!-- 图层上移下移左移右移动操作 -->
                <div class="optcontainer">
                  <el-tooltip
                    class="item"
                    effect="dark"
                    content="预报层次向上切换"
                    placement="top"
                  >
                    <el-button
                      icon="el-icon-top"
                      size="mini"
                      @click="uplevel()"
                    ></el-button>
                  </el-tooltip>
                  <el-tooltip
                    class="item"
                    effect="dark"
                    content="预报层次向下切换"
                    placement="top"
                  >
                    <el-button
                      icon="el-icon-bottom"
                      size="mini"
                      @click="downlevel"
                    ></el-button>
                  </el-tooltip>
                  <el-tooltip
                    class="item"
                    effect="dark"
                    content="预报时效向前切换"
                    placement="top"
                  >
                    <el-button
                      icon="el-icon-back"
                      size="mini"
                      @click="prevTime"
                    ></el-button>
                  </el-tooltip>
                  <el-tooltip
                    class="item"
                    effect="dark"
                    content="预报时效向后切换"
                    placement="top"
                  >
                    <el-button
                      icon="el-icon-right"
                      size="mini"
                      @click="nextTime"
                    ></el-button>
                  </el-tooltip>
                  <el-tooltip
                    class="item"
                    effect="dark"
                    content="导出地图为图片"
                    placement="top"
                  >
                    <el-button
                      icon="el-icon-download"
                      size="mini"
                      @click="download"
                    ></el-button>
                  </el-tooltip>
                </div>
                 <!--经纬度显示 -->
                <div class="showinformations">
                  <span>
                    <b
                      style="
                        width: 35px;
                        overflow: hidden;
                        display: inline-block;
                        height: 20px;
                      "
                      >经度:</b
                    >
                    <el-tooltip
                      class="item"
                      effect="dark"
                      v-if="checkedComprehensivedata"
                      :content="Coordinate.longitude"
                      placement="top-start"
                    >
                      <b
                        v-if="checkedComprehensivedata"
                        style="
                          width: 70px;
                          overflow: hidden;
                          display: inline-block;
                          height: 20px;
                        "
                        >{{ Coordinate.longitude }}</b
                      >
                    </el-tooltip>
                  </span>

                  <span>
                    <b
                      style="
                        width: 35px;
                        overflow: hidden;
                        display: inline-block;
                        height: 20px;
                      "
                      >纬度:</b
                    >
                    <el-tooltip
                      class="item"
                      effect="dark"
                      v-if="checkedComprehensivedata"
                      :content="Coordinate.latitude"
                      placement="top-start"
                    >
                      <b
                        v-if="checkedComprehensivedata"
                        style="
                          width: 70px;
                          overflow: hidden;
                          display: inline-block;
                          height: 20px;
                        "
                      >
                        {{ Coordinate.latitude }}</b
                      >
                    </el-tooltip>
                  </span>
                </div>
                <!-- 绘制航线 -->
                <div class="drawline">
                  <!-- <el-button size="mini" @click="drawLines">
                    绘制航线</el-button
                  > -->

                  <el-checkbox v-model="checkeddrawline">绘制航线</el-checkbox>
                </div>

                <!-- 综合数据表 -->
                <div class="Comprehensivedatasheet">
                  <!-- <el-button size="mini" type="success"> 综合数据表</el-button> -->

                  <el-checkbox
                    v-model="checkedComprehensivedata"
                    @change="mappoint()"
                    >综合数据表</el-checkbox
                  >
                </div>
                <!-- 
                测试
                 -->

                <div class="test" v-if="false">
                  <el-button @click="test()"> 测试</el-button>
                </div>
               
              </div>
            </div>
          </el-scrollbar>
        </div>

        <div class="rightBar">
          <div class="map" style="width: 100%; height: 100%" id="map"></div>
          <div class="displayPlane" v-if="showPlane">
            <i
              class="el-icon-error"
              style="
                cursor: pointer;
                position: absolute;
                top: 10px;
                right: 10px;
              "
              @click="showPlane = false"
            ></i>
            <div class="title">展示形式</div>

            <div class="displayContent">
              <ul>
                <li v-for="item in displaytypelist" :key="item.value">
                  <span v-for="list in viewlist" :key="list">
                    <el-checkbox-group
                      v-model="displaytypeVal"
                      @change="displaytypechange(item)"
                    >
                      <el-checkbox
                        :disabled="!layeritem.isShow"
                        v-if="list == item.default_view"
                        :label="item.value"
                        :key="item.value"
                        >{{ item.name }}</el-checkbox
                      >
                    </el-checkbox-group>
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import mapboxgl from "mapbox-gl";
import MapboxDraw from "@mapbox/mapbox-gl-draw";
import * as turf from "@turf/turf";
import request from "@/utils/request";
import "@mapbox/mapbox-gl-draw/dist/mapbox-gl-draw.css";
import dqIsoline from "dq-isoline"; // 等值线插件
import dqfengyu from "dq-fengyu"; // 风羽图插件

mapboxgl.accessToken =
  "pk.eyJ1IjoibWFvcmV5IiwiYSI6ImNqNWhrenIwcDFvbXUyd3I2bTJxYzZ4em8ifQ.KHZIehQuWW9AsMaGtATdwA";
export default {
  data() {
    return {
      showPlane: false,
      layeritem: {}, // 图层选中id

      dateTime: "", //日期选择
      viewlist: [], // 每种要素展示列表
      displaytypeVal: [], // 展示要素类型

      essentialfactor: {}, //当前要素选中
      displaytypelist: [
        {
          value: "contourf",
          name: "色斑图", //色斑图
          state: false,
          default_view: 1,
        },
        {
          value: "contour",
          name: "等值线", //  等值线
          state: false,
          default_view: 2,
        },
        {
          value: "mapping",
          name: "填图", //填图
          state: false,
          default_view: 3,
        },
        {
          value: "barbs",
          name: "风场", //风场
          state: false,
          default_view: 4,
        },
      ], // 展示类型
      value: [],
      itemList: [
        {
          name: "数值预报",
        },
        {
          name: "卫星云图",
        },
        {
          name: "雷达回波",
        },
      ], // 顶部类型切换
      tabval: "数值预报",
      modevalue: "", // 模式类型
      modeName: "", //模式名称
      resolveType: "", //分辨率类型
      resolveVal: "", // 分辨率值
      startingReport: [
        {
          name: "000小时",
          value: "000",
        },
        {
          name: "003小时",
          value: "003",
        },
        {
          name: "006小时",
          value: "006",
        },
        {
          name: "009小时",
          value: "009",
        },
        {
          name: "012小时",
          value: "012",
        },
        {
          name: "015小时",
          value: "015",
        },

        {
          name: "018小时",
          value: "018",
        },

        {
          name: "021小时",
          value: "021",
        },
        {
          name: "024小时",
          value: "024",
        },

        {
          name: "027小时",
          value: "027",
        },
        {
          name: "030小时",
          value: "030",
        },
        {
          name: "033小时",
          value: "033",
        },
        {
          name: "036小时",
          value: "036",
        },
        {
          name: "039小时",
          value: "039",
        },
        {
          name: "042小时",
          value: "042",
        },
        {
          name: "045小时",
          value: "045",
        },
        {
          name: "048小时",
          value: "048",
        },
        {
          name: "051小时",
          value: "051",
        },
        {
          name: "054小时",
          value: "054",
        },
        {
          name: "057小时",
          value: "057",
        },

        {
          name: "060小时",
          value: "060",
        },
        {
          name: "063小时",
          value: "063",
        },
        {
          name: "066小时",
          value: "066",
        },
        {
          name: "069小时",
          value: "069",
        },
        {
          name: "072小时",
          value: "072",
        },
        {
          name: "078小时",
          value: "078",
        },
        {
          name: "084小时",
          value: "084",
        },
        {
          name: "090小时",
          value: "090",
        },
        {
          name: "096小时",
          value: "096",
        },
        {
          name: "102小时",
          value: "102",
        },
        {
          name: "108小时",
          value: "108",
        },
        {
          name: "114小时",
          value: "114",
        },
        {
          name: "168小时",
          value: "168",
        },
        {
          name: "192小时",
          value: "192",
        },
        {
          name: "216小时",
          value: "216",
        },
        {
          name: "240小时",
          value: "240",
        },
      ], //起报时效列表
      Forecastelements: [], //  预报要素列表
      Forecastelementval: "", // 预报要素选中值
      ForecastelementvalName: "", // 预报要素选择名称
      StartingReportTime: "", // 起报时间
      StartingReportTimelist: [
        {
          value: "00",
          name: "00",
        },
        {
          value: "01",
          name: "01",
        },

        {
          value: "02",
          name: "02",
        },
        {
          value: "03",
          name: "03",
        },
        {
          value: "04",
          name: "04",
        },
        {
          value: "05",
          name: "05",
        },

        {
          value: "06",
          name: "06",
        },

        {
          value: "07",
          name: "07",
        },

        {
          value: "08",
          name: "08",
        },

        {
          value: "09",
          name: "09",
        },

        {
          value: "10",
          name: "10",
        },
        {
          value: "11",
          name: "11",
        },
        {
          value: "12",
          name: "12",
        },
        {
          value: "13",
          name: "13",
        },
        {
          value: "14",
          name: "14",
        },
        {
          value: "15",
          name: "15",
        },
        {
          value: "15",
          name: "15",
        },
        {
          value: "16",
          name: "16",
        },
        {
          value: "17",
          name: "17",
        },
        {
          value: "18",
          name: "18",
        },
        {
          value: "19",
          name: "19",
        },
        {
          value: "20",
          name: "20",
        },
        {
          value: "21",
          name: "21",
        },
        {
          value: "22",
          name: "22",
        },
        {
          value: "23",
          name: "23",
        },
        {
          value: "24",
          name: "24",
        },
      ],
      Forecastvalue: "", // 起报选择
      planestate: true, //面板管理状态
      map: null, //地图对象
      draw: null, // 绘图对象
      Forecastmodel: [], // 预报模式列表

      Forecastleve: [
        {
          vaule: "050",
          name: "50hPa",
        },
        {
          vaule: "070",
          name: "70hPa",
        },
        {
          vaule: "100",
          name: "100hPa",
        },
        {
          vaule: "150",
          name: "150hPa",
        },
        {
          vaule: "200",
          name: "200hPa",
        },
        {
          vaule: "250",
          name: "250hPa",
        },
        {
          vaule: "300",
          name: "300hPa",
        },
        {
          vaule: "400",
          name: "400hPa",
        },
        {
          vaule: "500",
          name: "500hPa",
        },
        {
          vaule: "600",
          name: "600hPa",
        },
        {
          vaule: "700",
          name: "700hPa",
        },
        {
          vaule: "850",
          name: "850hPa",
        },
        {
          vaule: "925",
          name: "925hPa",
        },
        {
          vaule: "000",
          name: "地面",
        },
      ], // 预报层次
      ForecastleveVal: "", // 预报层次选中值

      ForecastleveValName: "", // 预报层次选中名称

      layerList: [], // 图层列表
      checkeddrawline: false, //  绘制航线是否显示数据
      checkedComprehensivedata: false, // 综合数据表是否显示显示数据
      Coordinate: {
        longitude: "", // 经度
        latitude: "", //维度
      },
      linestringArr: {}, // 飞机航线数据
    };
  },
  mounted() {
    this.initMap();
    this.getForecastmodels();
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
    tabPlane(){
      
      var planecontent  =  document.getElementById("planecontent")
      if(this.planestate) {
          planecontent.style.height=200 +"px"
      }else{
          planecontent.style.height=0 +"px"
      }
           
    },
    // 下载导出地图为png
    download() {
      if (this.map) {
        var url = this.map.getCanvas().toDataURL();

        const a = document.createElement("a"); // 创建a标签
        a.setAttribute("download", ""); // download属性
        a.setAttribute("href", url); // href链接
        a.click(); // 自执
      }
    },

    // 预报层次向上切换
    uplevel() {
      var level = this.ForecastleveVal;
      var levelList = this.Forecastleve;
      var startIndex = 0;
      levelList.map((item, index) => {
        if (item.vaule == level && index > startIndex) {
          this.ForecastleveVal = levelList[index - 1].vaule;
        }
      });
      this.removeAlllayer();
      //  获取层次预报的值
      var Forecastlevelist = this.Forecastleve.map((item) => {
        return item.vaule;
      });

      var layerList = this.layerList;
      // var arr = []
      layerList.map((item) => {
        var obj = {};
        var hierarchy = item.params.hierarchy;
        var index =
          Forecastlevelist.indexOf(hierarchy) > 0
            ? Forecastlevelist.indexOf(hierarchy) - 1
            : 0;
        var filnalhierarchy = Forecastlevelist[index];
        var ForecastleveValName = (item.ForecastleveValName = this.Forecastleve[
          index
        ].name);
        var description =
          "日期时间:" +
          item.params.date +
          ";起报时间:" +
          item.params.time +
          ";预报模式:" +
          item.modeName +
          ";预报层次:" +
          ForecastleveValName +
          ";预报时效:" +
          item.Forecastvalue +
          "小时" +
          ";预报要素:" +
          item.ForecastelementvalName;
        item.description = description;
        var id =
          item.params.date +
          item.params.time +
          item.modevalue +
          filnalhierarchy +
          item.params.prescription +
          item.type +
          item.timestamp;

        item.id = id;
        item.params.hierarchy = filnalhierarchy;
        item.displaylayer.map((layer) => {
          if (layer.id) {
            layer.id = item.id + layer.type;
          }
        });
      });
      console.log(this.layerList);
      console.log(this.layeritem);
      this.manyPoint();
    },
    //预报层次向下切换
    downlevel() {
      var level = this.ForecastleveVal;
      var levelList = this.Forecastleve;
      var endIndex = this.Forecastleve.length - 1;
      levelList.map((item, index) => {
        if (item.vaule == level && index < endIndex) {
          this.ForecastleveVal = levelList[index + 1].vaule;
        }
      });
      this.removeAlllayer();
      //  获取层次预报的值
      var Forecastlevelist = this.Forecastleve.map((item) => {
        return item.vaule;
      });

      var layerList = this.layerList;
      // var arr = []
      layerList.map((item) => {
        var obj = {};
        var hierarchy = item.params.hierarchy;
        var index =
          Forecastlevelist.indexOf(hierarchy) < Forecastlevelist.length - 1
            ? Forecastlevelist.indexOf(hierarchy) + 1
            : Forecastlevelist.length - 1;
        var filnalhierarchy = Forecastlevelist[index];
        var ForecastleveValName = (item.ForecastleveValName = this.Forecastleve[
          index
        ].name);
        var description =
          "日期时间:" +
          item.params.date +
          ";起报时间:" +
          item.params.time +
          ";预报模式:" +
          item.modeName +
          ";预报层次:" +
          ForecastleveValName +
          ";预报时效:" +
          item.Forecastvalue +
          "小时" +
          ";预报要素:" +
          item.ForecastelementvalName;
        item.description = description;
        var id =
          item.params.date +
          item.params.time +
          item.modevalue +
          filnalhierarchy +
          item.params.prescription +
          item.type +
          item.timestamp;

        item.id = id;
        item.params.hierarchy = filnalhierarchy;
        item.displaylayer.map((layer) => {
          if (layer.id) {
            layer.id = item.id + layer.type;
          }
        });
      });
      console.log(this.layerList);
      console.log(this.layeritem);
      this.manyPoint();
    },
    //预报时效向前切换
    prevTime() {
      var level = this.Forecastvalue;
      console.log(typeof level);
      var levelList = this.startingReport;
      var startIndex = 0;
      levelList.map((item, index) => {
        if (item.value == level && index > startIndex) {
          this.Forecastvalue = levelList[index - 1].value;
        }
      });

      this.removeAlllayer();
      //  获取预报时效的值
      var Forecastlevelist = this.startingReport.map((item) => {
        return item.value;
      });
      console.log(Forecastlevelist);

      var layerList = this.layerList;
      // var arr = []
      layerList.map((item) => {
        console.log(item);
        // var obj = {};
        var prescription = item.params.prescription;
        var index =
          Forecastlevelist.indexOf(prescription) > 0
            ? Forecastlevelist.indexOf(prescription) - 1
            : 0;
        var filnalprescription = Forecastlevelist[index];
        console.log(filnalprescription);
        var Forecastvalue = (item.Forecastvalue = this.startingReport[
          index
        ].name);
        var description =
          "日期时间:" +
          item.params.date +
          ";起报时间:" +
          item.params.time +
          ";预报模式:" +
          item.modeName +
          ";预报层次:" +
          item.ForecastleveValName +
          ";预报时效:" +
          Forecastvalue +
          "小时" +
          ";预报要素:" +
          item.ForecastelementvalName;
        item.description = description;
        var id =
          item.params.date +
          item.params.time +
          item.modevalue +
          item.params.hierarchy +
          filnalprescription +
          item.type +
          item.timestamp;

        item.id = id;
        item.params.prescription = filnalprescription;
        item.displaylayer.map((layer) => {
          if (layer.id) {
            layer.id = item.id + layer.type;
          }
        });
      });
      console.log(this.layerList);
      // console.log(this.layeritem);
      this.manyPoint();
    },
    //预报时效向后切换
    nextTime() {
      var level = this.Forecastvalue;
      var levelList = this.startingReport;
      var endIndex = this.startingReport.length - 1;
      levelList.map((item, index) => {
        if (item.value == level && index < endIndex) {
          this.Forecastvalue = levelList[index + 1].value;
        }
      });

      this.removeAlllayer();
      //  获取预报时效的值
      var Forecastlevelist = this.startingReport.map((item) => {
        return item.value;
      });
      console.log(Forecastlevelist);

      var layerList = this.layerList;
      // var arr = []
      layerList.map((item) => {
        console.log(item);
        // var obj = {};
        var prescription = item.params.prescription;

        var index =
          Forecastlevelist.indexOf(prescription) < Forecastlevelist.length - 1
            ? Forecastlevelist.indexOf(prescription) + 1
            : Forecastlevelist.length - 1;
        var filnalprescription = Forecastlevelist[index];
        console.log(filnalprescription);
        var Forecastvalue = (item.Forecastvalue = this.startingReport[
          index
        ].name);
        var description =
          "日期时间:" +
          item.params.date +
          ";起报时间:" +
          item.params.time +
          ";预报模式:" +
          item.modeName +
          ";预报层次:" +
          item.ForecastleveValName +
          ";预报时效:" +
          Forecastvalue +
          "小时" +
          ";预报要素:" +
          item.ForecastelementvalName;
        item.description = description;
        var id =
          item.params.date +
          item.params.time +
          item.modevalue +
          item.params.hierarchy +
          filnalprescription +
          item.type +
          item.timestamp;

        item.id = id;
        item.params.prescription = filnalprescription;
        item.displaylayer.map((layer) => {
          if (layer.id) {
            layer.id = item.id + layer.type;
          }
        });
      });
      console.log(this.layerList);
      // console.log(this.layeritem);
      this.manyPoint();
    },

    // 多级要素切换
    async manyPoint() {
      var paramsARR = [];
      this.layerList.map((item) => {
        var params1 = JSON.parse(JSON.stringify(item.params));
        // console.log(params1)

        item.displaylayer.map((layer) => {
          if (layer.id) {
            var obj = {
              date: params1.date,
              displaytype: "",
              essential: params1.essential,
              hierarchy: params1.hierarchy,
              prescription: params1.prescription,
              time: params1.time,
              timestamp: params1.timestamp,
              modevalue: params1.modevalue,
              type: params1.type,
            };
            console.log(layer.type);
            obj.displaytype = layer.type;

            paramsARR.push(obj);
          }
        });
      });
      console.log(paramsARR);
      let result = await request({
        url: "/dataGram/getNumericalPrediction",
        method: "post",
        data: paramsARR,
      });
      if (result.code == 200) {
        let arr = result.data;
        for (let i = 0; i < arr.length; i++) {
          //1.色斑图
          if (arr[i].displaytype == "contourf") {
            // 进行当前要素展示形式图层id添加

            let id =
              arr[i].date +
              arr[i].time +
              arr[i].modevalue +
              arr[i].hierarchy +
              arr[i].prescription +
              arr[i].essential +
              arr[i].timestamp +
              arr[i].displaytype;
            let visibility = "none";
            this.layerList.map((item) => {
              item.displaylayer.map((layer) => {
                if (layer.id == id && item.isShow && layer.show) {
                  visibility = "visible";
                }
              });
            });
            this.map.addLayer({
              id: id,
              source: arr[i].data,
              type: "raster",
              paint: { "raster-opacity": 0.5 },
            });
            this.map.setLayoutProperty(id, "visibility", visibility);
          }
          // 2.等值线

          if (arr[i].displaytype == "contour") {
            let id =
              arr[i].date +
              arr[i].time +
              arr[i].modevalue +
              arr[i].hierarchy +
              arr[i].prescription +
              arr[i].essential +
              arr[i].timestamp +
              arr[i].displaytype;
            let visibility = "none";
            this.layerList.map((item) => {
              item.displaylayer.map((layer) => {
                if (layer.id == id && item.isShow && layer.show) {
                  visibility = "visible";
                }
              });
            });
            let option = {
              id: id, //等值线id (必选参数)
              map: this.map, // 地图对象(必选参数)
              data: arr[i].data, // 等值线数据(必选参数)
              lineColor: "blue", // 线条颜色
              lineWidth: 3, //线条宽度 (number类型)
              symbolsize: 14, //符号大小(number类型)
              symbolcolor: "red", // 符号颜色
            };
            var dqIsoline1 = new dqIsoline(option);
            dqIsoline1.install();
            this.map.setLayoutProperty(id, "visibility", visibility);
            this.map.setLayoutProperty(id + "label", "visibility", visibility);
          }
          // 3.填图类型
          if (arr[i].displaytype == "mapping") {
            let id =
              arr[i].date +
              arr[i].time +
              arr[i].modevalue +
              arr[i].hierarchy +
              arr[i].prescription +
              arr[i].essential +
              arr[i].timestamp +
              arr[i].displaytype;
            let visibility = "none";
            this.layerList.map((item) => {
              item.displaylayer.map((layer) => {
                if (layer.id == id && item.isShow && layer.show) {
                  visibility = "visible";
                }
              });
            });
            this.map.addLayer({
              id: id,
              type: "symbol",
              source: {
                type: "geojson",
                data: arr[i].data,
              },
              layout: {
                "text-field": ["get", "data"],
              },
              paint: {
                "text-color": "yellow",
              },
            });
            this.map.setLayoutProperty(id, "visibility", visibility);
          }

          // 4.风羽图
          if (arr[i].displaytype == "barbs") {
            let id =
              arr[i].date +
              arr[i].time +
              arr[i].modevalue +
              arr[i].hierarchy +
              arr[i].prescription +
              arr[i].essential +
              arr[i].timestamp +
              arr[i].displaytype;
            let visibility = "none";
            this.layerList.map((item) => {
              item.displaylayer.map((layer) => {
                if (layer.id == id && item.isShow && layer.show) {
                  visibility = "visible";
                }
              });
            });
            let config = {
              map: this.map, //地图对象
              size: 0.8, //风杆大小比例 0-1
              color: "#fff", //风杆颜色
              lineWidth: 3, //  风杆的粗细
            };
            var Qqfengyu = new dqfengyu(config);
            Qqfengyu.addimageIocn();
            var option = {
              id: id,
              data: arr[i].data,
            };
            Qqfengyu.addLayer(option);
            this.map.setLayoutProperty(id, "visibility", visibility);
          }
        }
      }
    },

    // 删除叠加的图层
    removeAlllayer() {
      this.layerList.map((item) => {
        item.displaylayer.map((layer) => {
          if (layer.id && this.map.getLayer(layer.id)) {
            if (layer.type == "contour") {
              this.map.removeLayer(layer.id + "label");
            }
            this.map.removeLayer(layer.id);
            this.map.removeSource(layer.id);
          }
        });
      });
    },
    //日期时间选择
    pickdateTime() {
      this.getlayer();
    },
    //  起报时间选择
    pickStartingReportTime() {
      this.getlayer();
    },
    // 预报模式事件选择
    async Forecastmodelchange(id) {
      var arr = this.Forecastmodel;
      arr.map((item) => {
        if (item.id == id) {
          this.modeName = item.name;
        }
      });
      this.getlayer();

      this.Forecastelements = [];
      this.Forecastelementval = "";

      let result = await request({
        url: "/dataGram/getEssential",
        method: "get",
        params: { id: id },
      });
      if (result.code == 200) {
        this.Forecastelements = result.data;
      }

      // console.log(result)
    },
    // 预报层次
    pickForecastleveVal() {
      this.Forecastleve.map((item) => {
        if (item.vaule == this.ForecastleveVal) {
          this.ForecastleveValName = item.name;
        }
      });
      this.getlayer();
    },
    // 预报时效选择
    pickForecastvalue() {
      this.getlayer();
    },
    // 预报要素选择
    pickForecastelementval() {
      this.Forecastelements.map((item) => {
        if (this.Forecastelementval == item.name_en) {
          this.essentialfactor = item;

          this.ForecastelementvalName = item.name;
        }
      });

      this.getlayer();
    },
    // 展示形式切换
    displaytypechange(item) {
      item.state = !item.state;

      let displaylayer = this.layeritem.displaylayer;

      if (item.state) {
        let arr = [];
        displaylayer.map((items) => {
          if (item.value == items.type) {
            arr.push(items);
            this.delPointsLayers(arr);
            items.id = "";
          }
        });

        let params = this.layeritem.params;
        params.displaytype = item.value;

        if (this.layeritem.isShow) {
          this.getData([params]);
        }
      } else {
        let arr = [];

        displaylayer.map((items) => {
          if (item.value == items.type) {
            items.show = false;
            arr.push(items);
            this.delPointsLayers(arr);
            items.id = "";
          }
        });

        console.log(this.layeritem);
      }
    },
    // 四个类型的展示方式删除
    delPointsLayers(arrs) {
      for (let i = 0; i < arrs.length; i++) {
        //1.色斑图
        if (arrs[i].type == "contourf") {
          if (arrs[i].id && this.map.getLayer(arrs[i].id)) {
            this.map.removeLayer(arrs[i].id);
            this.map.removeSource(arrs[i].id);
          }
        }
        //2.等值线
        if (arrs[i].type == "contour") {
          if (arrs[i].id && this.map.getLayer(arrs[i].id)) {
            this.map.removeLayer(arrs[i].id + "label");
            this.map.removeLayer(arrs[i].id);
            this.map.removeSource(arrs[i].id);
          }
        }
        //3.填图
        if (arrs[i].type == "mapping") {
          if (arrs[i].id && this.map.getLayer(arrs[i].id)) {
            this.map.removeLayer(arrs[i].id);
            this.map.removeSource(arrs[i].id);
          }
        }
        // 4.风羽图
        if (arrs[i].type == "barbs") {
          if (arrs[i].id && this.map.getLayer(arrs[i].id)) {
            this.map.removeLayer(arrs[i].id);
            this.map.removeSource(arrs[i].id);
          }
        }
      }
    },
    // 图层获取生成图层列表
    getlayer() {
      setTimeout(() => {
        render();
      }, 200);
      var render = () => {
        if (
          this.dateTime &&
          this.StartingReportTime &&
          this.modevalue &&
          this.ForecastleveVal &&
          this.Forecastvalue &&
          this.Forecastelementval
        ) {
          this.showPlane = true;
          var timestamp = new Date().getTime();
          var id =
            this.dateTime +
            this.StartingReportTime +
            this.modevalue +
            this.ForecastleveVal +
            this.Forecastvalue +
            this.Forecastelementval +
            timestamp;
          let arr = this.layerList;

          for (let i = 0; i < arr.length; i++) {
            if (arr[i].id == id) {
              this.$message.error("该图层存在,请勿重复添加!");
              return;
            }
          }
          var description =
            "日期时间:" +
            this.dateTime +
            ";起报时间:" +
            this.StartingReportTime +
            ";预报模式:" +
            this.modeName +
            ";预报层次:" +
            this.ForecastleveValName +
            ";预报时效:" +
            this.Forecastvalue +
            "小时" +
            ";预报要素:" +
            this.ForecastelementvalName;
          this.displaytypeVal = [];
          var type = " ";
          var Forecastmodel = this.Forecastmodel;
          for (let i = 0; i < Forecastmodel.length; i++) {
            if (Forecastmodel[i].id == this.modevalue) {
              type = Forecastmodel[i].name_en;
            }
          }

          // 构造图层管理id
          var obj = {
            timestamp: timestamp,
            id: id,
            description: description,
            type: this.Forecastelementval,
            ForecastleveValName: this.ForecastleveValName,
            Forecastvalue: this.Forecastvalue,
            ForecastelementvalName: this.ForecastelementvalName,
            default_view: this.essentialfactor.default_view,
            modevalue: this.modevalue,
            modeName: this.modeName,
            view: this.essentialfactor.view,
            params: {
              type: type,
              date: this.dateTime,
              time: this.StartingReportTime,
              essential: this.Forecastelementval,
              prescription: this.Forecastvalue,
              hierarchy: this.ForecastleveVal,
              displaytype: "",
              modevalue: this.modevalue,
              timestamp: timestamp,
            },
            displaylayer: [
              {
                type: "contourf",
                id: "",

                show: false,
                default_view: 1,
              },
              {
                type: "contour",
                id: "",
                show: false,
                default_view: 2,
              },
              {
                type: "mapping",
                id: "",
                show: false,
                default_view: 3,
              },
              {
                type: "barbs",
                id: "",
                show: false,
                default_view: 4,
              },
            ],
            isShow: true, //小眼睛的反选和选择状态
          };

          this.layeritem = obj;
          this.viewlist = this.essentialfactor.view.split(",");

          this.layerList.unshift(obj);
          this.displaytypelist.map((item) => {
            item.state = false;
            if (item.default_view == this.essentialfactor.default_view) {
              obj.params.displaytype = item.value;
              item.state = true;
            }
          });

          this.displaytypeVal.push(obj.params.displaytype);

          this.getData([obj.params]);
        }
      };
    },
    //测试
    test() {
      if (this.modevalue == 1 || this.modevalue == 2) {
        this.modevalue = 2;
      }

      let arr = this.displaytypeVal;

      let params = [];
      if (arr.length > 0) {
        for (let i = 0; i < arr.length; i++) {
          let obj = {
            date: this.dateTime,
            time: this.StartingReportTime,
            type: this.modevalue,
            hierarchy: this.ForecastleveVal,
            prescription: this.Forecastvalue,
            essential: this.Forecastelementval,
          };
        }
        console.log(params);
      }
    },
    //图层面板管理当前条目选中
    currentlayer(item) {
      // this.showPlane=true
      this.layeritem = item;
      this.layeritem = item;
      this.viewlist = item.view.split(",");
      let displaylayer = item.displaylayer;
      this.displaytypeVal = [];
      this.displaytypelist.map((items) => {
        items.state = false;

        displaylayer.map((layer) => {
          //  console.log(layer)
          if (layer.type == items.value && layer.show) {
            items.state = true;
            this.displaytypeVal.push(items.value);
          }
        });
      });
    },
    //当前图层选中与隐藏
    showDisplay(item) {
      console.log(item);
      // 小眼睛选中与反选
      item.isShow = !item.isShow;
      // 当前图层列表选中
      this.layeritem = item;
      this.viewlist = item.view.split(",");
      let displaylayer = item.displaylayer;
      this.displaytypeVal = [];
      this.displaytypelist.map((items) => {
        items.state = false;

        displaylayer.map((layer) => {
          //  console.log(layer)
          if (layer.type == items.value && layer.show) {
            items.state = true;
            this.displaytypeVal.push(items.value);
          }
        });
      });
      // 反选选中的图层显示跟隐藏
      if (item.isShow) {
        this.showPlane = true;
        let displaylayer = item.displaylayer;

        for (let i = 0; i < displaylayer.length; i++) {
          if (displaylayer[i].show && displaylayer[i].id) {
            this.map.setLayoutProperty(
              displaylayer[i].id,
              "visibility",
              "visible"
            );
            if (displaylayer[i].type == "contour") {
              this.map.setLayoutProperty(
                displaylayer[i].id + "label",
                "visibility",
                "visible"
              );
            }
          }
        }
      } else {
        let displaylayer = item.displaylayer;

        for (let i = 0; i < displaylayer.length; i++) {
          if (displaylayer[i].show && displaylayer[i].id) {
            this.map.setLayoutProperty(
              displaylayer[i].id,
              "visibility",
              "none"
            );
            if (displaylayer[i].type == "contour") {
              this.map.setLayoutProperty(
                displaylayer[i].id + "label",
                "visibility",
                "none"
              );
            }
          }
        }
      }
    },
    // 图层管理面板当前条目删除
    delDisplay(item) {
      // alert(1)
      this.showPlane = false;
      let arr = this.layerList;

      for (let i = 0; i < arr.length; i++) {
        if (arr[i].id == item.id) {
          this.delPointsLayers(arr[i].displaylayer);
          this.layerList.splice(i, 1);
        }
      }
      this.layeritem = {};
    },
    // 综合预报请求保存
    async getData(data) {
      let result = await request({
        url: "/dataGram/getNumericalPrediction",
        method: "post",
        data: data,
      });
      if (result.code == 200) {
        let arrs = result.data;

        // 四种展示形式

        for (let i = 0; i < arrs.length; i++) {
          //1.色斑图
          if (arrs[i].displaytype == "contourf" && arrs[i].data) {
            // 进行当前要素展示形式图层id添加
            let id = this.layeritem.id + this.layeritem.displaylayer[0].type;
            this.layeritem.displaylayer[0].id = id;
            this.layeritem.displaylayer[0].show = true;
            this.map.addLayer({
              id: id,
              source: arrs[i].data,
              type: "raster",
              paint: { "raster-opacity": 0.5 },
            });
          }
          // 2.等值线

          if (arrs[i].displaytype == "contour" && arrs[i].data) {
            // 进行当前要素展示形式图层id添加
            let id = this.layeritem.id + this.layeritem.displaylayer[1].type;
            this.layeritem.displaylayer[1].id = id;
            this.layeritem.displaylayer[1].show = true;
            let option = {
              id: id, //等值线id (必选参数)
              map: this.map, // 地图对象(必选参数)
              data: arrs[i].data, // 等值线数据(必选参数)
              lineColor: "blue", // 线条颜色
              lineWidth: 3, //线条宽度 (number类型)
              symbolsize: 14, //符号大小(number类型)
              symbolcolor: "red", // 符号颜色
            };
            var dqIsoline1 = new dqIsoline(option);
            dqIsoline1.install();
          }
          //  3.填图类型
          if (arrs[i].displaytype == "mapping" && arrs[i].data) {
            let id = this.layeritem.id + this.layeritem.displaylayer[2].type;
            this.layeritem.displaylayer[2].id = id;
            this.layeritem.displaylayer[2].show = true;
            console.log(arrs[i].data);
            this.map.addLayer({
              id: id,
              type: "symbol",
              source: {
                type: "geojson",
                data: arrs[i].data,
              },
              layout: {
                "text-field": ["get", "data"],
              },
              paint: {
                "text-color": "yellow",
              },
            });
          }
          // 4.风羽图
          if (arrs[i].displaytype == "barbs" && arrs[i].data) {
            let id = this.layeritem.id + this.layeritem.displaylayer[3].type;
            this.layeritem.displaylayer[3].id = id;
            this.layeritem.displaylayer[3].show = true;

            let config = {
              map: this.map, //地图对象
              size: 0.8, //风杆大小比例 0-1
              color: "#fff", //风杆颜色
              lineWidth: 3, //  风杆的粗细
            };
            var Qqfengyu = new dqfengyu(config);
            Qqfengyu.addimageIocn();
            var option = {
              id: id,
              data: arrs[i].data,
            };
            Qqfengyu.addLayer(option);
          }
        }
      }
      console.log(this.layeritem);
      console.log(this.layerList);
    },
    //顶部tab切换
    tab(item) {
      this.tabval = item.name;
    },
    // 初始化地图
    initMap() {
      var map = (this.map = new mapboxgl.Map({
        container: "map",
        style: "mapbox://styles/mapbox/navigation-guidance-night-v2",
        center: [120.39629, 36.30744],
        zoom: 1,
        attributionControl: false,
        preserveDrawingBuffer: true,
      }));
      map.on("load", () => {
        var draw = (this.draw = new MapboxDraw({
          displayControlsDefault: false,
          controls: {
            point: true,
            line_string: true,
            polygon: false,
            combine_features: false,
            uncombine_features: false,
            trash: true,
          },
        }));

        map.addControl(draw);
        map.on("draw.modechange", (e) => {
          const data = draw.getAll();

          // 保证每次只绘制一次
          if (draw.getMode()) {
            var pids = [];

            const lid = data.features[data.features.length - 1].id;

            data.features.forEach((f) => {
              if (f.id !== lid) {
                pids.push(f.id);
              }
            });
            draw.delete(pids);
          }
        });

        map.on("draw.update", (e) => {
          var type = e.features[0].geometry.type;
          if (type && type == "Point") {
            this.Coordinate.longitude = e.features[0].geometry.coordinates[0];
            this.Coordinate.latitude = e.features[0].geometry.coordinates[1];
          }
          if (type && type == "LineString") {
            this.linestringArr = e.features[0];
            console.log(e.features[0]);
          }
        });

        map.on("draw.create", (e) => {
          var type = e.features[0].geometry.type;
          if (type && type == "Point") {
            this.Coordinate.longitude = e.features[0].geometry.coordinates[0];
            this.Coordinate.latitude = e.features[0].geometry.coordinates[1];
          }
          if (type && type == "LineString") {
            this.linestringArr = e.features[0];
            console.log(e.features[0]);
          }
        });

        // draw.delete

        map.on("draw.delete", (e) => {
          this.Coordinate.longitude = "";
          this.Coordinate.latitude = "";
          this.linestringArr = {};
        });
      });
    },
    // // 绘制航线
    drawLines() {
      if (this.draw && Object.keys(this.linestringArr) != 0) {
        console.log(this.linestringArr);
        var features = this.linestringArr;

        var finalArr = [];
        turf.coordEach(
          features,
          function (
            currentCoord,
            coordIndex,
            featureIndex,
            multiFeatureIndex,
            geometryIndex
          ) {
            finalArr.push([currentCoord[0] - 0.5, currentCoord[1] - 0.5]);
          }
        );
        console.log(finalArr);
        var linestring = turf.lineString(finalArr);
        //  console.log(linestring);
      }
    },
    // 地图选点
    mappoint() {},

    //  获取预报模式
    async getForecastmodels() {
      let result = await request({
        url: "/dataGram/getEssential",
        method: "get",
        params: { id: 0 },
      });
      if (result.code == 200) {
        this.Forecastmodel = result.data;
      }
    },
  },
};
</script>
<style lang="scss" scoped>
@import url("https://api.tiles.mapbox.com/mapbox-gl-js/v0.44.2/mapbox-gl.css");
::v-deep a.mapboxgl-ctrl-logo {
  display: none;
}
.Forecastsynthesis {
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
      .layerList {
        .spanItem {
          color: #999;
        }
        .spanActive {
          color: #000;
          font-weight: bold;
        }
      }
      .mode {
        height: 40px;
        width: 100%;
        display: flex;
        justify-content: space-around;
        align-items: center;
        background: rgb(239, 239, 239);
        border: 0.1px solid rgb(155, 155, 155);
        margin-bottom: 10px;
        .label {
          font-size: 13px;
        }
      }

      .list {
        width: 100%;

        border: 0.1px solid rgb(155, 155, 155);
        margin-bottom: 10px;
        .label {
          font-size: 13px;
          display: block;
          height: 40px;
          line-height: 40px;
          padding-left: 10px;
          background: rgb(239, 239, 239);
        }
        .main {
          width: 100%;
          height: 200px;
          ul {
            list-style: none;
            margin: 0;
            padding: 10px;
            li {
              height: 30px;
              line-height: 30px;
            }
          }
        }
      }
      .optContianer {
        margin-top: 10px;
        width: 100%;
        min-height: 90px;
        border: 0.1px solid rgb(155, 155, 155);
        overflow: hidden;
        .title {
          height: 40px;
          line-height: 40px;
          padding-left: 10px;
          font-size: 13px;
          background: rgb(239, 239, 239);
        }
        .main {
          height: 150px;
          .content {
            padding: 10px 0;
            text-align: center;
            display: flex;
            justify-content: space-around;
            flex-wrap: wrap;
            .el-button {
              margin: 0;
            }
          }
        }
      }
      .resolving {
        height: 40px;
        width: 100%;
        padding: 5px;

        background: rgb(239, 239, 239);
        border: 0.1px solid rgb(155, 155, 155);
      }
      .Forecasttimeliness {
        margin-top: 10px;
        width: 100%;
        height: 40px;
        border: 0.1px solid rgb(155, 155, 155);
        overflow: hidden;
        .title {
          height: 40px;
          line-height: 40px;
          padding-left: 5px;
          display: flex;
          justify-content: space-around;
          font-size: 13px;
          background: rgb(239, 239, 239);
        }
      }

      .Forecastpoint {
        margin-top: 10px;
        width: 100%;
        min-height: 90px;
        border: 0.1px solid rgb(155, 155, 155);
        overflow: hidden;
        .title {
          height: 40px;
          line-height: 40px;
          padding-left: 10px;
          font-size: 13px;
          background: rgb(239, 239, 239);
        }
        .main {
          background: #fff;
          width: 100%;
          min-height: 90px;
          text-align: center;
          padding: 10px;
        }
      }
      .Displayelements {
        margin-top: 10px;
        width: 100%;
        height: 260px;
        border: 0.1px solid rgb(155, 155, 155);
        overflow: hidden;
        .title {
          height: 40px;
          line-height: 40px;
          padding-left: 10px;
          font-size: 13px;
          background: rgb(239, 239, 239);
        }
        .item {
          width: 60px;
          height: 30px;
          line-height: 30px;
          text-align: center;
          background: rgb(239, 239, 239);
          font-size: 13px;
          border: 0.1px solid rgb(155, 155, 155);
          color: #9b9b9b;
          cursor: pointer;
          margin: 5px 0;
        }
        .main {
          background: #fff;
          width: 100%;
          height: 60px;
          display: flex;
          justify-content: space-around;
          flex-wrap: wrap;
          margin-bottom: 20px;
        }
        .optContent {
          height: 35px;
          line-height: 35px;
          text-align: center;
        }
        .PT {
          height: 60px;
          width: 100%;
          display: flex;
          justify-content: space-around;
          .item {
            width: 90px;
            height: 30px;
            line-height: 30px;
            text-align: center;
            background: rgb(239, 239, 239);
            font-size: 13px;
            border: 0.1px solid rgb(155, 155, 155);
            color: #9b9b9b;
            cursor: pointer;
            margin: 5px 0;
          }
        }
      }
      .plane {
        margin-top: 10px;
        height: auto;
        width: 100%;

        border: 0.1px solid #9b9b9b;
        margin-bottom: 10px;
        .title {
          height: 40px;
          line-height: 40px;
          padding-left: 10px;
          font-size: 13px;
          background: rgb(239, 239, 239);
          width: 100%;
          .label {
            font-size: 13px;
          }
        }

        .main {
          height: 200px;
          .content {
            height: 400px;
            ul {
              list-style: none;
              margin: 0;
              padding: 0;
              li {
                line-height: 25px;
                height: 25px;
                font-size: 13.5px;
                padding: 0 15px;
                margin-bottom: 5px;
                display: flex;
                justify-content: space-around;

                width: 100%;
                span {
                  display: inline-block;
                  width: 67%;
                  overflow: hidden;
                  margin-right: 10px;
                }
                .el-button {
                  padding: 3px;
                }
              }
            }
          }
        }
      }
      .optcontainer {
        width: 100%;
        height: 35px;
        line-height: 35px;
        margin: 5px 0;
        text-align: center;
        ::v-deep .el-button {
          padding: 5px 8px;
        }
      }

      .drawline {
        display: flex;
        justify-content: flex-start;
        align-items: center;
        .el-button {
          width: 50%;
          background: rgb(39, 169, 227);
          color: #fff;
        }
      }

      .Comprehensivedatasheet {
        margin: 10px 0;
        display: flex;
        justify-content: flex-start;
        align-items: center;
        .el-button {
          width: 50%;

          color: #fff;
        }
      }

      .showinformations {
        margin: 10px 0;
        display: flex;
        justify-content: space-around;
        align-items: center;
        span {
          display: inline-block;
          width: 50%;
          font-size: 13px;
        }
      }
    }
    .rightBar {
      width: calc(100% - 259px);
      height: calc(100vh - 130px);
      position: absolute;
      top: 50px;
      right: 0;
      .displayPlane {
        position: absolute;
        bottom: 30px;
        right: 30px;
        width: 200px;
        height: 250px;
        background: #fff;
        z-index: 3000;
        border-radius: 10px;
        .title {
          width: 100%;
          height: 35px;
          line-height: 35px;
          text-align: center;
          font-size: 14px;
          font-weight: bold;
        }
        .displayContent {
          .title {
            margin: 0;
          }
          ul {
            list-style: none;
            margin: 0;
            padding: 0;
            li {
              padding: 0 30px;
              margin-bottom: 5px;
            }
          }
        }
      }
    }
  }
}
</style>