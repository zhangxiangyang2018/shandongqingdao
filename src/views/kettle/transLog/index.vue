<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" :inline="true" v-show="showSearch" label-width="68px">
      <el-form-item label="转换名称" prop="transName">
        <el-input
          v-model="queryParams.transName"
          placeholder="请输入转换名称"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="执行状态" prop="status">
        <el-select v-model="queryParams.status" placeholder="请选择执行状态" clearable size="small">
          <el-option
            v-for="dict in statusOptions"
            :key="dict.dictValue"
            :label="dict.dictLabel"
            :value="dict.dictValue"
          />
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="cyan" icon="el-icon-search" size="mini" @click="handleQuery">搜索</el-button>
        <el-button icon="el-icon-refresh" size="mini" @click="resetQuery">重置</el-button>
      </el-form-item>
    </el-form>

    <el-row :gutter="10" class="mb8">
      <el-col :span="1.5">
        <el-button
          type="danger"
          plain
          icon="el-icon-delete"
          size="mini"
          :disabled="multiple"
          @click="handleDelete"
          v-hasPermi="['kettle:transLog:remove']"
        >删除</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="danger"
          plain
          icon="el-icon-delete"
          size="mini"
          @click="handleClean"
          v-hasPermi="['kettle:transLog:remove']"
        >清空</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="warning"
          plain
          icon="el-icon-download"
          size="mini"
          @click="handleExport"
          v-hasPermi="['kettle:transLog:export']"
        >导出</el-button>
      </el-col>
      <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar>
    </el-row>

    <el-table v-loading="loading" :data="transLogList" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" align="center" />
      <el-table-column label="转换日志ID" align="center" prop="transLogId" />
<!--      <el-table-column label="转换ID" align="center" prop="transId" />-->
      <el-table-column label="转换名称" align="center" prop="transName" />
      <el-table-column label="启动时间" align="center" prop="startTime" width="180"/>
      <el-table-column label="停止时间" align="center" prop="stopTime" width="180"/>
      <el-table-column label="执行状态" align="center" prop="status" :formatter="statusFormat" />
<!--      <el-table-column label="日志信息" align="center" prop="runInfo" />-->
<!--      <el-table-column label="异常信息" align="center" prop="exceptionInfo" />-->
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="text"
            icon="el-icon-view"
            @click="handleView(scope.row,scope.index)"
            v-hasPermi="['kettle:transLog:query']"
          >详细</el-button>
        </template>
      </el-table-column>
    </el-table>

    <pagination
      v-show="total>0"
      :total="total"
      :page.sync="queryParams.pageNum"
      :limit.sync="queryParams.pageSize"
      @pagination="getList"
    />

    <!-- 转换执行日志详细 -->
    <el-dialog title="转换执行日志详细" :visible.sync="open" width="1000px" append-to-body>
      <el-form ref="form" :model="form" label-width="100px" size="mini">
        <el-row>
          <el-col :span="15">
            <el-form-item label="转换ID：">{{ form.transId }}</el-form-item>
            <el-form-item label="转换名称：">{{ form.transName }}</el-form-item>
          </el-col>
          <el-col :span="9">
            <el-form-item label="启动时间：">{{ form.startTime }}</el-form-item>
            <el-form-item label="停止时间：">{{ form.stopTime }}</el-form-item>
          </el-col>
          <el-col :span="15">
            <el-form-item label="执行状态：">
              <div v-if="form.status === '0'">正常</div>
              <div v-else-if="form.status === '1'">失败</div>
              <div v-else>未知</div>
            </el-form-item>
          </el-col>
          <el-col :span="9">
            <el-form-item label="耗时：">{{ form.consumingTime }}</el-form-item>
          </el-col>
          <el-col :span="24">
<!--            <el-form-item label="日志信息：">{{ form.exceptionInfo }}</el-form-item>-->
            <el-form-item label="日志信息：">
              <span v-html="form.runInfo"></span>
            </el-form-item>
          </el-col>
          <el-col :span="24">
<!--            <el-form-item label="异常信息：">{{ form.exceptionInfo }}</el-form-item>-->
            <el-form-item label="异常信息：">
              <span v-html="form.exceptionInfo"></span>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="open = false">关 闭</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { listTransLog, getTransLog, delTransLog, cleanTransLog, addTransLog, updateTransLog, exportTransLog } from "@/api/kettle/transLog";

export default {
  name: "TransLog",
  components: {
  },
  data() {
    return {
      // 遮罩层
      loading: true,
      // 选中数组
      ids: [],
      // 非单个禁用
      single: true,
      // 非多个禁用
      multiple: true,
      // 显示搜索条件
      showSearch: true,
      // 总条数
      total: 0,
      // 转换执行日志表格数据
      transLogList: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      // 执行状态字典
      statusOptions: [],
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        status: null,
      },
      // 表单参数
      form: {},
      // 表单校验
      rules: {
      }
    };
  },
  created() {
    this.getList();
    this.getDicts("kettle_result_status").then(response => {
      this.statusOptions = response.data;
    });
  },
  methods: {
    /** 查询转换执行日志列表 */
    getList() {
      this.loading = true;
      listTransLog(this.queryParams).then(response => {
        this.transLogList = response.rows;
        this.total = response.total;
        this.loading = false;
      });
    },
    // 执行状态字典翻译
    statusFormat(row, column) {
      return this.selectDictLabel(this.statusOptions, row.status);
    },
    // 取消按钮
    cancel() {
      this.open = false;
      this.reset();
    },
    // 表单重置
    reset() {
      this.form = {
        transLogId: null,
        transId: null,
        transName: null,
        startTime: null,
        stopTime: null,
        consumingTime: null,
        status: null,
        runInfo: null,
        exceptionInfo: null,
        createTime: null
      };
      this.resetForm("form");
    },
    /** 详细按钮操作 */
    handleView(row) {
      this.form = row;
      this.open = true;
    },
    /** 搜索按钮操作 */
    handleQuery() {
      this.queryParams.pageNum = 1;
      this.getList();
    },
    /** 重置按钮操作 */
    resetQuery() {
      this.resetForm("queryForm");
      this.handleQuery();
    },
    // 多选框选中数据
    handleSelectionChange(selection) {
      this.ids = selection.map(item => item.transLogId)
      this.single = selection.length!==1
      this.multiple = !selection.length
    },
    /** 删除按钮操作 */
    handleDelete(row) {
      const transLogIds = row.transLogId || this.ids;
      this.$confirm('是否确认删除转换执行日志编号为"' + transLogIds + '"的数据项?', "警告", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }).then(function() {
          return delTransLog(transLogIds);
        }).then(() => {
          this.getList();
          this.msgSuccess("删除成功");
        })
    },
    /** 清空按钮操作 */
    handleClean() {
      this.$confirm('是否确认清空所有操作日志数据项?', "警告", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(function() {
        return cleanTransLog();
      }).then(() => {
        this.getList();
        this.msgSuccess("清空成功");
      })
    },
    /** 导出按钮操作 */
    handleExport() {
      const queryParams = this.queryParams;
      this.$confirm('是否确认导出所有转换执行日志数据项?', "警告", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }).then(function() {
          return exportTransLog(queryParams);
        }).then(response => {
          this.download(response.msg);
        })
    }
  }
};
</script>
