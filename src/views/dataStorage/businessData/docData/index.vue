<template>
  <div class="doc-data">
    <common-title :title="title" />
    <common-board>
      
      <div class="line-one">
        <span>日期范围:</span>
        <div class="day-select">
          <el-date-picker v-model="dayStart" type="date" placeholder="选择日期">
          </el-date-picker>
        </div>
        <div class="line">
          <div class="sub-line"></div>
        </div>
        <div class="day-select">
          <el-date-picker v-model="dayEnd" type="date" placeholder="选择日期">
          </el-date-picker>
        </div>

        <span>上级单位:</span>
        <div class="other-select">
          <el-select v-model="superiorUnitValue" placeholder="请选择">
            <el-option
              v-for="item in superiorUnit"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </div>

        <span>本级单位:</span>
        <div class="other-select">
          <el-select v-model="thisUnitValue" placeholder="请选择">
            <el-option
              v-for="item in thisUnit"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </div>

        <span>文件名:</span>
        <div class="other-select">
          <el-select v-model="fileNameValue" placeholder="请选择">
            <el-option
              v-for="item in fileName"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </div>

        <span>内容分类:</span>
        <div class="other-select">
          <el-select v-model="contentCategoryValue" placeholder="请选择">
            <el-option
              v-for="item in contentCategory"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </div>

        <span>上传人:</span>
        <div class="other-select">
          <el-select v-model="upLoadValue" placeholder="请选择">
            <el-option
              v-for="item in upLoad"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </div>
        <div class="btn">
          <el-button type="primary">查询</el-button>
        </div>
        <div class="btn">
          <el-button type="primary">上传</el-button>
        </div>
        <div class="btn">
          <el-button type="primary">批量下载</el-button>
        </div>
      </div>

      <div class="table">
        <el-table :data="tableData" style="width: 100%" :border="true">
          <el-table-column type="selection" align="center"> </el-table-column>
          <el-table-column label="序号" align="center">
            <template slot-scope="scope">
              {{ scope.$index }}
            </template>
          </el-table-column>
          <el-table-column label="时间" align="center">
            <template slot-scope="scope">
              {{ scope.row.time }}
            </template>
          </el-table-column>
          <el-table-column label="名称型号" align="center">
            <template slot-scope="scope">
              {{ scope.row.type }}
            </template>
          </el-table-column>
          <el-table-column label="编号" align="center">
            <template slot-scope="scope">
              {{ scope.row.number }}
            </template>
          </el-table-column>
          <el-table-column label="维护或检修人" align="center">
            <template slot-scope="scope">
              {{ scope.row.person }}
            </template>
          </el-table-column>
          <el-table-column label="排除方法" align="center">
            <template slot-scope="scope">
              {{ scope.row.method }}
            </template>
          </el-table-column>
          <el-table-column
            label="损坏/更换元器件名称/数量"
            width="180"
            align="center"
          >
            <template slot-scope="scope">
              {{ scope.row.method }}
            </template>
          </el-table-column>
          <el-table-column label="备注" align="center">
            <template slot-scope="scope">
              {{ scope.row.remark }}
            </template>
          </el-table-column>
          <el-table-column label="操作" align="center" width="180">
            <template slot-scope="scope">
              <span @click="handleDelete(scope.$index, scope.row)">
                <a class="text-success" href="javascript:;">查看</a>
              </span>
              <span @click="handleDelete(scope.$index, scope.row)">
                <a class="text-info" href="javascript:;">下载</a>
              </span>
              <span @click="handleDelete(scope.$index, scope.row)">
                <a class="text-warning" href="javascript:;">编辑</a>
              </span>
              <span @click="handleDelete(scope.$index, scope.row)">
                <a class="text-danger" href="javascript:;">删除</a>
              </span>
            </template>
          </el-table-column>
        </el-table>
      </div>

    </common-board>
  </div>
</template>

<script>
import CommonTitle from "@/components/cfyComponents/title";
import CommonBoard from "@/components/cfyComponents/board";
import {
  superiorUnit,
  thisUnit,
  fileName,
  contentCategory,
  upLoad
} from "../config/docData";
export default {
  name: "DocData",
  components: {
    CommonTitle,
    CommonBoard
  },
  data() {
    return {
      title: "文件资料",
      dayStart: "",
      dayEnd: "",
      superiorUnit, //上级单位
      superiorUnitValue: "",
      thisUnit, //本级单位
      thisUnitValue: "",
      fileName, //文件名
      fileNameValue: "",
      contentCategory, //内容分类
      contentCategoryValue: "",
      upLoad, //上传人
      upLoadValue: "",
      tableData: [
        {
          time: "2020-04-19 15:12",
          type: "a",
          number: "489264892",
          person: "张三",
          method: "get",
          remark: "无"
        },
        {
          time: "2020-04-19 15:12",
          type: "a",
          number: "489264892",
          person: "张三",
          method: "get",
          remark: "无"
        }
      ]
    };
  }
};
</script>

<style lang="scss" scoped>
.line-one {
  display: flex;
  justify-content: space-around;

  span {
    padding: 0 10px;
    font-size: 14px;
    text-align: center;
    line-height: 36px;
  }
  .line {
    position: relative;
    width: 10px;
    height: 36px;
    margin: 0 10px;
    .sub-line {
      position: absolute;
      top: 0;
      bottom: 0;
      margin: auto;
      width: 100%;
      height: 2px;
      background-color: #ddd;
    }
  }
  .day-select {
    flex: 1.2;
  }
  .other-select {
    flex: 1.2;
  }

  .btn {
    flex: 1;
    padding: 0 10px;
  }
}

.table {
  margin-top: 10px;

  span {
    padding: 2px;
  }
}
</style>
