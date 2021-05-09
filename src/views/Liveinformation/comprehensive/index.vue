<template>
  <div>
    <!--
    * @FileDescription: 实况综合
    * @Author: 张向阳
    * @Date: 2021/5/8
    * @LastEditors:  张向阳
    * @LastEditTime: 2021/5/8
    
    -->
    <div class="Groundanalysispic">
      <div class="header">综合实况</div>
      <div class="content">
        <div class="leftbar">
          <el-scrollbar style="height: 100%">
            <div style="height: 900px">
              <!-- 类型选择 -->
              <div class="typelist">
                <div
                  v-for="item in typelist"
                  :key="item.name"
                  :class="[item.id == currentType ? 'active' : 'item']"
                  @click="tabType(item)"
                >
                  {{ item.name }}
                </div>
              </div>
              <!-- 高空包裹区域 -->
              <div v-if="currentType == 1">
                <div class="Timeselection">
                  <div class="headerline">
                    <el-date-picker
                      value-format="yyyy-MM-dd"
                      format="yyyy-MM-dd"
                      type="date"
                      size="mini"
                      v-model="highaltitudeDate"
                      placeholder="选择日期"
                      style="width: 70%"
                    >
                    </el-date-picker>
                    <el-select
                      v-model="highaltitudedayVal"
                      placeholder="请选择"
                      size="mini"
                      style="width: 20%; margin-left: 10px"
                    >
                      <el-option
                        v-for="item in timeArr"
                        :key="item.value"
                        :label="item.name"
                        :value="item.value"
                      >
                      </el-option>
                    </el-select>
                  </div>

                  <div class="main">
                    <div
                      :class="
                        item.name == highaltitudetimeVal ? 'itemActive' : 'item'
                      "
                      v-for="(item, index) in highaltitudetimeArr"
                      :key="index"
                      @click="highaltitudetimeSwitch(item)"
                    >
                      <div class="btn">
                        <i :class="item.icon"></i>
                      </div>
                      <div class="label">{{ item.name }}</div>
                    </div>
                  </div>
                </div>
                <div class="highaltitudelevel">
                  <span class="label"> 层次选择: </span>
                  <el-select
                    placeholder="请选择"
                    size="mini"
                    style="width: 70%"
                    v-model="highaltitudelevelval"
                  >
                  </el-select>
                </div>
                <div class="highaltitudecontentAnalysis">
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

                <!-- 要素选择 -->
                <div class="highaltitudefactorSelection">
                  <div class="title">
                    <span>要素选择</span>
                  </div>
                  <div class="main">
                    <div class="item">WD..</div>
                    <div class="item">TT</div>
                    <div class="item">T-Td</div>
                    <div class="item">H</div>
                  </div>
                </div>
              </div>

              <!-- 地面包裹区域 -->
              <div v-if="currentType == 2">
                <div class="Timeselection">
                  <div class="headerline">
                    <el-date-picker
                      value-format="yyyy-MM-dd"
                      format="yyyy-MM-dd"
                      type="date"
                      size="mini"
                      v-model="highaltitudeDate"
                      placeholder="选择日期"
                      style="width: 70%"
                    >
                    </el-date-picker>
                    <el-select
                      v-model="highaltitudedayVal"
                      placeholder="请选择"
                      size="mini"
                      style="width: 20%; margin-left: 10px"
                    >
                      <el-option
                        v-for="item in timeArr"
                        :key="item.value"
                        :label="item.name"
                        :value="item.value"
                      >
                      </el-option>
                    </el-select>
                  </div>

                  <div class="main">
                    <div
                      :class="
                        item.name == highaltitudetimeVal ? 'itemActive' : 'item'
                      "
                      v-for="(item, index) in highaltitudetimeArr"
                      :key="index"
                      @click="highaltitudetimeSwitch(item)"
                    >
                      <div class="btn">
                        <i :class="item.icon"></i>
                      </div>
                      <div class="label">{{ item.name }}</div>
                    </div>
                  </div>
                </div>

                <div class="highaltitudecontentAnalysis">
                  <div class="title">分析要素</div>
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

                <!-- 要素选择 -->
                <div class="highaltitudefactorSelection">
                  <div class="title">
                    <span>要素选择</span>
                  </div>
                  <div class="main">
                    <div class="item">sta</div>
                    <div class="item">TT</div>
                    <div class="item">vv</div>
                    <div class="item">CH</div>
                  </div>
                </div>
              </div>

              <!-- 实况包裹区域 -->
              <div v-if="currentType == 3">
                <div class="Timeselection">
                  <div class="headerline">
                    <el-date-picker
                      value-format="yyyy-MM-dd"
                      format="yyyy-MM-dd"
                      type="date"
                      size="mini"
                      v-model="highaltitudeDate"
                      placeholder="选择日期"
                      style="width: 70%"
                    >
                    </el-date-picker>
                    <el-select
                      v-model="highaltitudedayVal"
                      placeholder="请选择"
                      size="mini"
                      style="width: 20%; margin-left: 10px"
                    >
                      <el-option
                        v-for="item in timeArr"
                        :key="item.value"
                        :label="item.name"
                        :value="item.value"
                      >
                      </el-option>
                    </el-select>
                  </div>

                  <div class="main">
                    <div
                      :class="
                        item.name == highaltitudetimeVal ? 'itemActive' : 'item'
                      "
                      v-for="(item, index) in highaltitudetimeArr"
                      :key="index"
                      @click="highaltitudetimeSwitch(item)"
                    >
                      <div class="btn">
                        <i :class="item.icon"></i>
                      </div>
                      <div class="label">{{ item.name }}</div>
                    </div>
                  </div>
                </div>

                <div class="highaltitudecontentAnalysis">
                  <div class="title">分析要素</div>
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

                <!-- 要素选择 -->
                <div class="highaltitudefactorSelection">
                  <div class="title">
                    <span>要素选择</span>
                  </div>
                  <div class="main">
                    <div class="item">sta</div>
                    <div class="item">TT</div>
                    <div class="item">vv</div>
                    <div class="item">CH</div>
                  </div>
                </div>
              </div>
              <!--  云图包裹区域 -->
              <div v-if="currentType == 4">
                <!-- 云图选择 -->
                <div class="level">
                  <span class="label"> 云图: </span>
                  <el-select
                    placeholder="请选择"
                    size="mini"
                    style="width: 70%"
                    v-model="cloudVal"
                    @change="cloundChange"
                  >
                    <el-option
                      v-for="item in cloudList"
                      :key="item.satellite"
                      :label="item.satellite_name"
                      :value="item.satellite"
                    >
                    </el-option>
                  </el-select>
                </div>

                <!-- 通道选择 -->
                <div class="level">
                  <span class="label"> 通道: </span>
                  <el-select
                    placeholder="请选择"
                    size="mini"
                    v-model="passagewayVal"
                    @change="passagewayChange"
                    style="width: 70%"
                  >
                    <el-option
                      v-for="item in passagewayList"
                      :key="item.product"
                      :label="item.product_name"
                      :value="item.product"
                    >
                    </el-option>
                  </el-select>
                </div>

                <!-- 日期选择 -->
                <div class="level">
                  <span class="label"> 日期: </span>
                  <el-date-picker
                    v-model="dateVal"
                    value-format="yyyy-MM-dd"
                    format="yyyy-MM-dd"
                    size="mini"
                    style="width: 70%"
                    type="date"
                    @change="dateChange"
                    placeholder="选择日期"
                  >
                  </el-date-picker>
                </div>

                <!-- 时间列表 -->
                <div class="timeList">
                  <el-scrollbar style="height: 100%">
                    <div class="container" style="height: 500px">
                      <h4>时间选择</h4>
                      <ul>
                        <li v-for="(item, index) in timeList" :key="index">
                          <el-radio
                            v-model="timeVal"
                            :label="item"
                            @change="timeChange"
                            >{{ item }}</el-radio
                          >
                        </li>
                      </ul>
                    </div>
                  </el-scrollbar>
                </div>
                <!-- 播放控制 -->
                <div class="control">
                  <el-button
                    :type="isPlay == true ? 'danger' : 'primary'"
                    round
                    size="mini"
                    @click="play()"
                  >
                    <span v-if="!isPlay">播放</span>
                    <span v-if="isPlay"> 暂停</span>
                  </el-button>
                </div>
              </div>

              <!-- 雷达包裹区域 -->
              <div v-if="currentType == 5">
                <div class="level">
                  <span class="label"> 站点: </span>
                  <el-select
                    placeholder="请选择"
                    size="mini"
                    style="width: 70%"
                    v-model="siteVal"
                    @change="siteChange()"
                  >
                    <el-option
                      v-for="item in siteList"
                      :key="item.station_id"
                      :label="item.station_name"
                      :value="item.station_id"
                    >
                    </el-option>
                  </el-select>
                </div>

                <div class="level">
                  <span class="label"> 产品: </span>
                  <el-select
                    placeholder="请选择"
                    size="mini"
                    style="width: 70%"
                    v-model="produceVal"
                    @change="produceChange"
                  >
                    <el-option
                      v-for="item in productList"
                      :key="item.type"
                      :label="item.product"
                      :value="item.type"
                    >
                    </el-option>
                  </el-select>
                </div>
                <div class="level">
                  <span class="label"> 仰角: </span>
                  <el-select
                    placeholder="请选择"
                    size="mini"
                    style="width: 70%"
                    v-model="elevationVal"
                    @change="elevationChange"
                  >
                    <el-option
                      v-for="item in elevationList"
                      :key="item"
                      :label="item"
                      :value="item"
                    >
                    </el-option>
                  </el-select>
                </div>

                <div class="level">
                  <span class="label"> 日期: </span>
                  <el-date-picker
                    v-model="radarDateVal"
                    value-format="yyyy-MM-dd"
                    format="yyyy-MM-dd"
                    size="mini"
                    style="width: 70%"
                    type="date"
                    placeholder="选择日期"
                    @change="radarDatechange"
                  >
                  </el-date-picker>
                </div>

                <!-- 时间列表 -->
                <div class="radartimeList">
                  <el-scrollbar style="height: 100%">
                    <div class="container" style="height: 500px">
                      <h4>时间选择</h4>
                      <ul>
                        <li v-for="(item, index) in radartimeList" :key="index">
                          <el-radio
                            v-model="radartimeVal"
                            :label="item"
                            @change="radartimeChange"
                            >{{ item }}</el-radio
                          >
                        </li>
                      </ul>
                    </div>
                  </el-scrollbar>
                </div>

                <div class="control">
                  <el-button
                    :type="isradarPlay == true ? 'danger' : 'primary'"
                    round
                    size="mini"
                    @click="radarPlay"
                  >
                    <span v-if="!isradarPlay">播放</span>
                    <span v-if="isradarPlay"> 暂停</span>
                  </el-button>
                </div>
              </div>

              <!-- 台风包裹区域 -->
              <div v-if="currentType == 6" class="typhoon">
                <div class="headers">
                  <span >
                    年份:
                    <el-date-picker
                      style="width: 80%"
                      size="mini"
                      v-model="value1"
                      type="date"
                      placeholder="选择日期"
                    >
                    </el-date-picker>
                  </span>
                </div>
                <div>
                  <div class="title">台风列表</div>
                  <el-table
                    :data="tableData"
                    border
                    style="width: 100%"
                    size="mini"
                  >
                    <el-table-column type="selection" width="55">
                    </el-table-column>
                    <el-table-column label="编号">
                      <template slot-scope="scope">
                        <!-- <el-checkbox v-model="checked">{{scope.row.name}}</el-checkbox> -->
                        <span>
                          {{ scope.row.name }}
                        </span>
                      </template>
                    </el-table-column>
                    <el-table-column prop="chinesename" label="中文名">
                    </el-table-column>

                    <el-table-column prop="englishname" label="英文名">
                    </el-table-column>

                    <el-table-column prop="date" label="生成日期">
                    </el-table-column>
                  </el-table>
                </div>
              </div>
              <!-- 图层管理 -->
              <div class="layerManger">
                <h4>图层管理</h4>
                <ul>
                  <li v-for="(item, index) in layerlist" :key="item.type">
                    <span>{{ index + 1 }}.{{ item.name }} </span>
                    <img
                      :src="
                        item.isShow == true
                          ? require('./images/show.png')
                          : require('./images/hide.png')
                      "
                      alt=""
                      @click="toggleLayer(item)"
                    />
                  </li>
                </ul>
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
import request from "@/utils/request";
import "@mapbox/mapbox-gl-draw/dist/mapbox-gl-draw.css";
mapboxgl.accessToken =
  "pk.eyJ1IjoibWFvcmV5IiwiYSI6ImNqNWhrenIwcDFvbXUyd3I2bTJxYzZ4em8ifQ.KHZIehQuWW9AsMaGtATdwA";
export default {
  data() {
    return {
      map: null, //地图对象
      dateVal: "", //时间选择
      dayVal: "", // 日期选择
      typelist: [
        {
          id: 1,
          name: "高空",
        },
        {
          id: 2,
          name: "地面",
        },
        {
          id: 3,
          name: "实况",
        },
        {
          id: 4,
          name: "云图",
        },
        {
          id: 5,
          name: "雷达",
        },
        {
          id: 6,
          name: "台风",
        },
      ], // 类型切换选项
      currentType: 1,
      isPlay: false, //是否进行云图播放
      cloudList: [], //  云图列表
      cloudVal: "", // 云图操作
      passagewayList: [], // 通道列表
      passagewayVal: "", // 通道值
      dateVal: "", // 日期选择
      timeList: [], // 时间选择列表
      timeVal: "", // 时间选择值
      timeIndex: -1, // 云图时间列表选择的下标
      cloudId: "", // 云图id
      cloudTimer: null, //  云图播放器

      isradarPlay: false, // 是否进行雷达图播放
      siteList: [], //站点列表
      siteVal: "", // 站点选择
      productList: [], // 产品列表
      produceVal: "", // 产品选择
      elevationList: [0.5, 1.0, 1.5, 2.0, 2.5, 3.0], // 仰角列表
      elevationVal: "", // 仰角值
      radarDateVal: "", // 雷达日期选择
      radartimeList: [], //  雷达时间列表
      radartimeVal: "", //雷达时间选择
      radarIndex: -1, //雷达时间列表选择下标
      radarId: "", // 雷达组图id
      radarTimer: null, // 雷达播放器
      layerlist: [
        {
          type: "highaltitude",
          name: "高空",
          isShow: true,
        },
        {
          type: "ground",
          name: "地面",
          isShow: true,
        },
        {
          type: "live",
          name: "实况",
          isShow: true,
        },
        {
          type: "cloud",
          name: "云图",
          isShow: true,
        },
        {
          type: "radar",
          name: "雷达",
          isShow: true,
        },
        {
          type: "typhoon",
          name: "台风",
          isShow: true,
        },
      ], // 图层管理
      highaltitudeDate: "", // 高空日期选择
      timeArr: [
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
      ], // 高空小时数组
      highaltitudedayVal: "", // 高空小时选择
      highaltitudetimeArr: [
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
      highaltitudetimeVal: "前一天",
      highaltitudelevels: [], // 高空层次选择
      highaltitudelevelval: "", // 高空层次选择
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
  created() {
    this.getcloudList();
    this.getpassagewayList();
    this.getsiteList();
    this.getproductList();
  },
  methods: {
    // 高空操作时次选择切换
    highaltitudetimeSwitch(item) {
      this.highaltitudetimeVal = item.name;
    },
    //  图层管理切换
    toggleLayer(item) {
      item.isShow = !item.isShow;
    },
    // 类型选择切换
    tabType(item) {
      this.currentType = item.id;
    },
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
    // 云图播放控制
    play() {
      this.isPlay = !this.isPlay;
      if (this.isPlay) {
        this.cloudPlay();
      } else {
        if (this.cloudTimer) {
          clearTimeout(this.cloudTimer);
          this.cloudTimer = null;
        }
      }
    },
    // 雷达图播放控制
    radarPlay() {
      this.isradarPlay = !this.isradarPlay;
      if (this.isradarPlay) {
        this.radarPlayloop();
      } else {
        if (this.radarTimer) {
          clearTimeout(this.radarTimer);
          this.radarTimer = null;
        }
      }
    },
    // 雷达组图递归调用自己播放
    async radarPlayloop() {
      this.radarIndex = this.radartimeList.indexOf(this.radartimeVal);
      this.radarIndex++;
      if (this.radarIndex > this.radartimeList.length - 1) {
        this.radarIndex = 0;
      }

      this.radartimeVal = this.radartimeList[this.radarIndex];
      if (
        this.siteVal &&
        this.produceVal &&
        this.elevationVal &&
        this.radarDateVal &&
        this.radartimeVal
      ) {
        var result = await request({
          url: "/climate/liveComprehensiveDisplay",
          method: "post",
          data: {
            type: "radar",
            station: this.siteVal,
            product_type: this.produceVal,
            elevation: this.elevationVal,
            date: this.radarDateVal,
            time: this.radartimeVal,
          },
        });
        if (result.code == 200) {
          if (this.map.getLayer(this.radarId)) {
            this.map.removeLayer(this.radarId);
            this.map.removeSource(this.radarId);
            this.radarId = "";
          }
          var source = result.data;
          source.coordinates = JSON.parse(source.coordinates);
          var id = (this.radarId =
            "radar" +
            this.siteVal +
            this.produceVal +
            this.elevationVal +
            this.radarDateVal +
            this.radartimeVal);
          this.map.addLayer({
            id: id,
            source: source,
            type: "raster",
            paint: { "raster-opacity": 0.5 },
          });
          if (this.radarTimer) {
            clearTimeout(this.radarTimer);
            this.radarTimer = null;
          }
          this.radarTimer = setTimeout(() => {
            this.radarPlayloop();
          }, 1200);
        }
      }
    },
    // 云图播放递归调用自己播放
    async cloudPlay() {
      this.timeIndex = this.timeList.indexOf(this.timeVal);
      this.timeIndex++;
      if (this.timeIndex > this.timeList.length - 1) {
        this.timeIndex = 0;
      }

      this.timeVal = this.timeList[this.timeIndex];
      if (this.cloudVal && this.passagewayVal && this.dateVal && this.timeVal) {
        var result = await request({
          url: "/climate/liveComprehensiveDisplay",
          method: "post",
          data: {
            type: "cloud",
            satellite: this.cloudVal,
            product_type: this.passagewayVal,
            time: this.timeVal,
            date: this.dateVal,
          },
        });
        if (result.code == 200) {
          if (this.map.getLayer(this.cloudId)) {
            this.map.removeLayer(this.cloudId);
            this.map.removeSource(this.cloudId);
          }
          var source = result.data;
          source.coordinates = JSON.parse(source.coordinates);
          var id = (this.cloudId =
            "cloud" +
            this.cloudVal +
            this.passagewayVal +
            this.timeVal +
            this.dateVal);
          this.map.addLayer({
            id: id,
            source: source,
            type: "raster",
            paint: { "raster-opacity": 0.5 },
          });
          if (this.cloudTimer) {
            clearTimeout(this.cloudTimer);
            this.cloudTimer = null;
          }
          this.cloudTimer = setTimeout(() => {
            this.cloudPlay();
          }, 1200);
        }
      }
    },
    //云图列表获取
    async getcloudList() {
      var result = await request({
        url: "/climate/getCloudType",
        method: "get",
      });
      if (result.code == 200) {
        this.cloudList = result.data;
      }
    },

    // 通道列表获取
    async getpassagewayList() {
      var result = await request({
        url: "/climate/getCloudProduct",
        method: "get",
      });
      if (result.code == 200) {
        this.passagewayList = result.data;
      }
    },
    // 时间列表获取
    async gettimeList() {
      if (this.cloudVal && this.passagewayVal && this.dateVal) {
        this.timeVal = "";
        var result = await request({
          url: "/climate/getCloudTime",
          method: "get",
          params: {
            satellite: this.cloudVal,
            product: this.passagewayVal,
            date: this.dateVal,
          },
        });
        if (result.code == 200) {
          this.timeList = result.data;
        }
      }
    },
    // 云图操作
    cloundChange() {
      if (this.cloudTimer) {
        clearTimeout(this.cloudTimer);
        this.cloudTimer = null;
      }
      if (this.map.getLayer(this.cloudId)) {
        this.map.removeLayer(this.cloudId);
        this.map.removeSource(this.cloudId);
        this.cloudId = "";
      }
      this.gettimeList();
    },
    // 通道操作
    passagewayChange() {
      this.isPlay = false;
      if (this.cloudTimer) {
        clearTimeout(this.cloudTimer);
        this.cloudTimer = null;
      }
      if (this.map.getLayer(this.cloudId)) {
        this.map.removeLayer(this.cloudId);
        this.map.removeSource(this.cloudId);
        this.cloudId = "";
      }
      this.gettimeList();
    },
    //  日期操作
    dateChange() {
      this.isPlay = false;
      if (this.cloudTimer) {
        clearTimeout(this.cloudTimer);
        this.cloudTimer = null;
      }
      if (this.map.getLayer(this.cloudId)) {
        this.map.removeLayer(this.cloudId);
        this.map.removeSource(this.cloudId);
        this.cloudId = "";
      }
      this.gettimeList();
    },
    // 云图组图请求
    async timeChange() {
      this.isPlay = false;
      if (this.cloudTimer) {
        clearTimeout(this.cloudTimer);
        this.cloudTimer = null;
      }

      if (this.cloudVal && this.passagewayVal && this.dateVal && this.timeVal) {
        var result = await request({
          url: "/climate/liveComprehensiveDisplay",
          method: "post",
          data: {
            type: "cloud",
            satellite: this.cloudVal,
            product_type: this.passagewayVal,
            time: this.timeVal,
            date: this.dateVal,
          },
        });
        if (result.code == 200) {
          if (this.map.getLayer(this.cloudId)) {
            this.map.removeLayer(this.cloudId);
            this.map.removeSource(this.cloudId);
            this.cloudId = "";
          }
          var source = result.data;
          source.coordinates = JSON.parse(source.coordinates);
          var id = (this.cloudId =
            "cloud" +
            this.cloudVal +
            this.passagewayVal +
            this.timeVal +
            this.dateVal);
          this.map.addLayer({
            id: id,
            source: source,
            type: "raster",
            paint: { "raster-opacity": 0.5 },
          });
          //  this.timeList = result.data;
        }
      }
    },
    // 雷达站点列表请求
    async getsiteList() {
      var result = await request({
        url: "/climate/getRadarStation",
        method: "get",
      });
      if (result.code == 200) {
        this.siteList = result.data;
      }
    },
    //雷达产品列表请求
    async getproductList() {
      var result = await request({
        url: "/climate/getRadarProduct",
        method: "get",
      });
      if (result.code == 200) {
        this.productList = result.data;
      }
    },
    // 雷达时间列表请求
    async getradartimeList() {
      if (
        this.siteVal &&
        this.produceVal &&
        this.elevationVal &&
        this.radarDateVal
      ) {
        var result = await request({
          url: "/climate/getRadarTime",
          method: "get",
          params: {
            station: this.siteVal,
            type: this.produceVal,
            date: this.radarDateVal,
            elevation: this.elevationVal,
          },
        });
        if (result.code == 200) {
          this.radartimeList = result.data;
        }
      }
    },
    // 雷达站点事件
    siteChange() {
      this.isradarPlay = false;
      if (this.radarTimer) {
        clearTimeout(this.radarTimer);
        this.radarTimer = null;
      }
      if (this.map.getLayer(this.radarId)) {
        this.map.removeLayer(this.radarId);
        this.map.removeSource(this.radarId);
        this.radarId = "";
      }
      this.getradartimeList();
    },
    // 雷达产品事件
    produceChange() {
      this.isradarPlay = false;
      if (this.radarTimer) {
        clearTimeout(this.radarTimer);
        this.radarTimer = null;
      }
      if (this.map.getLayer(this.radarId)) {
        this.map.removeLayer(this.radarId);
        this.map.removeSource(this.radarId);
        this.radarId = "";
      }
      this.getradartimeList();
    },
    // 雷达仰角事件
    elevationChange() {
      this.isradarPlay = false;
      if (this.radarTimer) {
        clearTimeout(this.radarTimer);
        this.radarTimer = null;
      }
      if (this.map.getLayer(this.radarId)) {
        this.map.removeLayer(this.radarId);
        this.map.removeSource(this.radarId);
        this.radarId = "";
      }
      this.getradartimeList();
    },
    // 雷达日期事件
    radarDatechange() {
      this.isradarPlay = false;
      if (this.radarTimer) {
        clearTimeout(this.radarTimer);
        this.radarTimer = null;
      }
      if (this.map.getLayer(this.radarId)) {
        this.map.removeLayer(this.radarId);
        this.map.removeSource(this.radarId);
        this.radarId = "";
      }
      this.getradartimeList();
    },
    //雷达组图请求
    async radartimeChange() {
      this.isradarPlay = false;
      if (this.radarTimer) {
        clearTimeout(this.radarTimer);
        this.radarTimer = null;
      }
      if (
        this.siteVal &&
        this.produceVal &&
        this.elevationVal &&
        this.radarDateVal &&
        this.radartimeVal
      ) {
        var result = await request({
          url: "/climate/liveComprehensiveDisplay",
          method: "post",
          data: {
            type: "radar",
            station: this.siteVal,
            product_type: this.produceVal,
            elevation: this.elevationVal,
            date: this.radarDateVal,
            time: this.radartimeVal,
          },
        });
        if (result.code == 200) {
          if (this.map.getLayer(this.radarId)) {
            this.map.removeLayer(this.radarId);
            this.map.removeSource(this.radarId);
            this.radarId = "";
          }
          var source = result.data;
          source.coordinates = JSON.parse(source.coordinates);
          var id = (this.radarId =
            "radar" +
            this.siteVal +
            this.produceVal +
            this.elevationVal +
            this.radarDateVal +
            this.radartimeVal);
          this.map.addLayer({
            id: id,
            source: source,
            type: "raster",
            paint: { "raster-opacity": 0.5 },
          });
        }
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
.Groundanalysispic {
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
      .typelist {
        width: 100%;
        height: 80px;
        display: flex;
        justify-content: space-between;
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
          margin: 5px;
        }
        .active {
          width: 60px;
          height: 30px;
          line-height: 30px;
          text-align: center;
          background: #000;
          font-size: 14px;
          border: 0.1px solid #000;
          color: #fff;
          cursor: pointer;
          font-weight: bold;
          margin: 5px;
        }
      }
      .level {
        height: 50px;
        line-height: 50px;
        padding-left: 10px;
        background: #efefef;
        margin-top: 10px;
        border: 0.1px solid #9b9b9b;
        .label {
          font-size: 13px;
        }
      }
      .timeList {
        height: 250px;
        margin-top: 30px;
        border: 0.1px solid #9b9b9b;
        h4 {
          margin: 0;
          padding: 0;
          height: 40px;
          line-height: 40px;
          text-align: center;
          background: #ccc;
          font-size: 14px;
        }
        ul {
          margin: 0;
          padding: 0;
          list-style: none;
          li {
            height: 32px;
            line-height: 32px;
            padding: 0 30px;
            border-bottom: 0.1px solid #999;
          }
        }
      }
      .radartimeList {
        height: 250px;
        margin-top: 30px;
        border: 0.1px solid #9b9b9b;
        h4 {
          margin: 0;
          padding: 0;
          height: 40px;
          line-height: 40px;
          text-align: center;
          background: #ccc;
          font-size: 14px;
        }
        ul {
          margin: 0;
          padding: 0;
          list-style: none;
          li {
            height: 32px;
            line-height: 32px;
            padding: 0 30px;
            border-bottom: 0.1px solid #999;
          }
        }
      }
      .control {
        margin-top: 10px;
        ::v-deep .el-button {
          width: 100%;
        }
      }
      .layerManger {
        height: auto;
        margin-top: 30px;
        border: 0.1px solid #9b9b9b;
        h4 {
          margin: 0;
          padding: 0;
          height: 40px;
          line-height: 40px;
          text-align: center;
          background: #ccc;
          font-size: 14px;
        }
        ul {
          margin: 0;
          padding: 0;
          list-style: none;
          li {
            height: 32px;
            line-height: 32px;
            padding: 0 30px;
            font-size: 13px;
            color: #000;
            background: #dcdcdc;
            border-bottom: 0.1px solid #ccc;
            img {
              float: right;
              width: 20px;
              margin-top: 7px;
              cursor: pointer;
            }
            // border-bottom: 0.1px solid #999;
          }
        }
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
      .highaltitudelevel {
        height: 45px;
        line-height: 45px;
        padding-left: 10px;
        background: #efefef;
        margin-top: 10px;
        border: 0.1px solid #9b9b9b;
        .label {
          font-size: 13px;
        }
      }

      .highaltitudecontentAnalysis {
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

      .highaltitudefactorSelection {
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
            margin: 5px;
          }
        }
      }
      .typhoon {
        .headers {
          height: 60px;
          font-size: 13px;
          display: flex;
          justify-content: flex-start;
          align-items: center;
        }
        .title  {
          background: #dcdcdc;
          height: 50px;
          line-height: 50px;
          padding-left: 20px;
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
    }
  }
}
</style>