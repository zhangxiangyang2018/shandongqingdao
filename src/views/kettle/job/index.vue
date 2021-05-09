<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" :inline="true" v-show="showSearch" label-width="68px">
      <el-form-item label="任务分类" prop="taskCategory">
        <el-select v-model="queryParams.taskCategory" placeholder="请选择任务分类" clearable size="small">
          <el-option
            v-for="dict in taskCategoryOptions"
            :key="dict.dictValue"
            :label="dict.dictLabel"
            :value="dict.dictValue"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="作业名称" prop="jobName">
        <el-input
          v-model="queryParams.jobName"
          placeholder="请输入作业名称"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="状态" prop="jobStatus">
        <el-select v-model="queryParams.jobStatus" placeholder="请选择状态" clearable size="small">
          <el-option
            v-for="dict in jobStatusOptions"
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
          type="primary"
          plain
          icon="el-icon-plus"
          size="mini"
          @click="handleAdd"
          v-hasPermi="['kettle:job:add']"
        >新增</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="success"
          plain
          icon="el-icon-edit"
          size="mini"
          :disabled="single"
          @click="handleUpdate"
          v-hasPermi="['kettle:job:edit']"
        >修改</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="danger"
          plain
          icon="el-icon-delete"
          size="mini"
          :disabled="multiple"
          @click="handleDelete"
          v-hasPermi="['kettle:job:remove']"
        >删除</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="warning"
          plain
          icon="el-icon-download"
          size="mini"
          @click="handleExport"
          v-hasPermi="['kettle:job:export']"
        >导出</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="info"
          plain
          icon="el-icon-s-operation"
          size="mini"
          @click="handleJobLog"
          v-hasPermi="['kettle:job:list']"
        >日志</el-button>
      </el-col>
      <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar>
    </el-row>

    <el-table v-loading="loading" :data="jobList" @selection-change="handleSelectionChange">
      <el-table-column width="25" type="selection" align="center" />
      <el-table-column width="80" label="作业ID" align="center" prop="id" />
      <el-table-column width="80" label="任务分类" align="center" prop="taskCategory" :formatter="taskCategoryFormat" />
      <el-table-column width="180" label="作业名称" align="center" prop="jobName" />
      <el-table-column width="280" label="作业描述" align="center" prop="jobDescription" />
<!--      <el-table-column label="执行类型" align="center" prop="jobType" :formatter="jobTypeFormat" />-->
      <el-table-column width="500" label="作业保存路径" align="center" prop="jobPath" />
<!--      <el-table-column label="作业的资源库ID" align="center" prop="jobRepositoryId" />-->
      <el-table-column width="180" label="cron执行表达式" align="center" prop="cronExpression" />
<!--      <el-table-column label="日志级别" align="center" prop="jobLogLevel" />-->
      <el-table-column width="80" label="状态" align="center" :formatter="jobStatusFormat">
        <template slot-scope="scope">
          <el-switch
            v-model="scope.row.jobStatus"
            active-value="0"
            inactive-value="1"
            @change="handleStatusChange(scope.row)"
          ></el-switch>
        </template>
      </el-table-column>
<!--      <el-table-column label="上次执行时间" align="center" prop="lastValidTime" width="180"/>-->
<!--      <el-table-column label="成功次数" align="center" prop="successCount" />-->
<!--      <el-table-column label="失败次数" align="center" prop="errorCount" />-->
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="text"
            icon="el-icon-caret-right"
            @click="handleRun(scope.row)"
            v-hasPermi="['kettle:job:changeStatus']"
          >执行一次</el-button>
          <!--          <el-button-->
          <!--            type="text"-->
          <!--            icon="el-icon-s-operation"-->
          <!--            size="mini"-->
          <!--            @click="handleJobLog(scope.row)"-->
          <!--            v-hasPermi="['kettle:job:list']"-->
          <!--          >日志</el-button>-->
          <el-button
            size="mini"
            type="text"
            icon="el-icon-view"
            @click="handleView(scope.row)"
            v-hasPermi="['kettle:job:query']"
          >详细
          </el-button>
          <el-button
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="handleUpdate(scope.row)"
            v-hasPermi="['kettle:job:edit']"
          >修改</el-button>
          <el-button
            size="mini"
            type="text"
            icon="el-icon-delete"
            @click="handleDelete(scope.row)"
            v-hasPermi="['kettle:job:remove']"
          >删除</el-button>
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

    <!-- 添加或修改作业管理对话框 -->
    <el-dialog :title="title" :visible.sync="open" width="1000px" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="130px" v-loading="loadingJob">
        <el-form-item label="执行类型" prop="jobType">
          <el-select v-model="form.jobType" placeholder="请选择执行类型" :style="{width: '100%'}" :disabled="jobDisabled">
            <el-option
              v-for="dict in jobTypeOptions"
              :key="dict.dictValue"
              :label="dict.dictLabel"
              :value="dict.dictValue"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="作业资源库" prop="jobRepositoryId">
          <el-select v-model="form.jobRepositoryId" placeholder="请选择资源库" :style="{width: '100%'}" @change="jobSelectChanged" :disabled="jobDisabled">
            <el-option
              v-for="dict in repositoryOptions"
              :key="dict.id"
              :label="dict.repName"
              :value="dict.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="作业保存路径" prop="jobPath">
          <treeselect
            v-model="form.jobPath"
            placeholder="请选择作业"
            :show-count="true"
            :show-all-levels="true"
            search-nested
            :options="jobPathOptions"
            :props="jobPathProps"
            :normalizer="normalizer"
            :disable-branch-nodes="true"
            :disabled="jobDisabled"
          />
<!--            @input="inputChange"-->
        </el-form-item>
        <el-form-item label="作业名称" prop="jobName">
<!--          <el-input v-model="form.jobName" placeholder="请选择作业路径" :disabled="jobDisabled" />-->
          <el-input v-model="form.jobName" placeholder="请选择作业路径" disabled="true" />
        </el-form-item>
        <el-form-item label="任务分类" prop="taskCategory">
          <el-select v-model="form.taskCategory" placeholder="请选择任务分类" :style="{width: '100%'}">
            <el-option
              v-for="dict in taskCategoryOptions"
              :key="dict.dictValue"
              :label="dict.dictLabel"
              :value="dict.dictValue"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="cron执行表达式" prop="cronExpression">
          <el-input v-model="form.cronExpression" placeholder="请输入cron执行表达式" />
        </el-form-item>
        <el-form-item label="日志级别" prop="jobLogLevel">
          <el-select v-model="form.jobLogLevel" placeholder="请选择日志级别" :style="{width: '100%'}">
            <el-option
              v-for="dict in jobLogLevelOptions"
              :key="dict.dictValue"
              :label="dict.dictLabel"
              :value="dict.dictValue"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="作业描述" prop="jobDescription">
          <el-input v-model="form.jobDescription" type="textarea" placeholder="请输入内容" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitForm">确 定</el-button>
        <el-button @click="cancel">取 消</el-button>
      </div>
    </el-dialog>

    <!-- 任务日志详细 -->
    <el-dialog title="作业详细" :visible.sync="openView" width="800px" append-to-body>
      <el-form ref="form" :model="form" label-width="120px" size="mini">
        <el-row>
          <el-col :span="12">
            <el-form-item label="作业ID：">{{ form.id }}</el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="作业名称：">{{ form.jobName }}</el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="创建时间：">{{ form.createTime }}</el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="cron表达式：">{{ form.cronExpression }}</el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="上次执行时间：">{{ form.lastValidTime }}</el-form-item>
            <el-form-item label="下次执行时间：">{{ parseTime(form.nextValidTime) }}</el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="成功次数：">{{ form.successCount }}</el-form-item>
            <el-form-item label="失败次数：">{{ form.errorCount }}</el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="任务分类：">{{ taskCategoryFormat(form) }}</el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="执行类型：">{{ jobTypeFormat(form) }}</el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="日志级别：">{{ jobLogLevelFormat(form) }}</el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="状态：">
              <div v-if="form.jobStatus == '0'">启动</div>
              <div v-else-if="form.jobStatus == '1'">暂停</div>
              <div v-else>未知</div>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="作业保存路径：">{{ form.jobPath }}</el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="作业描述：">{{ form.jobDescription }}</el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="openView = false">关 闭</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { listJob, getJob, delJob, addJob, updateJob, exportJob, runJob, changeJobStatus, getRepositoryDict, findJobRepTree } from "@/api/kettle/job";
import Treeselect from "@riophae/vue-treeselect";
import "@riophae/vue-treeselect/dist/vue-treeselect.css";

export default {
  name: "Job",
  components: {
    Treeselect
  },
  data() {
    return {
      // 遮罩层
      loading: true,
      // 遮罩层 作业窗口
      loadingJob: false,
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
      // 作业管理表格数据
      jobList: [],
      // 弹出层标题
      title: "",
      // 弹出层作业相关 是否只读
      jobDisabled: false,
      // 是否显示弹出层
      open: false,
      // 是否显示详细弹出层
      openView: false,
      // 资源库
      repositoryOptions: [],
      // 任务分类字典
      taskCategoryOptions: [],
      // 执行类型字典
      jobTypeOptions: [],
      // 日志级别字典
      jobLogLevelOptions: [],
      // 状态字典
      jobStatusOptions: [],
      // 是否删除字典
      delFlagOptions: [],
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        taskCategory: null,
        jobName: null,
        jobStatus: null,
      },
      // 表单参数
      form: {},
      // 表单校验
      rules: {
        taskCategory: [
          { required: true, message: "任务分类不能为空", trigger: "change" }
        ],
        jobName: [
          { required: true, message: "作业名称不能为空", trigger: "blur" }
        ],
        jobType: [
          { required: true, message: "执行类型不能为空", trigger: "change" }
        ],
        jobPath: [
          { required: true, message: "作业保存路径不能为空", trigger: "blur" }
        ],
        jobRepositoryId: [
          { required: true, message: "作业的资源库ID不能为空", trigger: "blur" }
        ],
        cronExpression: [
          { required: true, message: "cron执行表达式不能为空", trigger: "blur" }
        ],
        jobLogLevel: [
          { required: true, message: "日志级别不能为空", trigger: "blur" }
        ],
      },
      // 资源库中job作业内容树选项
      jobPathOptions: [],
      jobPathProps: {
        // "multiple": false,
        // "value": "extra",
        "id": "extra",
        "label": "text",
      },
    };
  },
  created() {
    this.getList();
    getRepositoryDict().then(response => {
      this.repositoryOptions = response.data;
    });
    this.getDicts("kettle_task_category").then(response => {
      this.taskCategoryOptions = response.data;
    });
    this.getDicts("kettle_run_type").then(response => {
      this.jobTypeOptions = response.data;
    });
    this.getDicts("kettle_log_level").then(response => {
      this.jobLogLevelOptions = response.data;
    });
    this.getDicts("kettle_task_status").then(response => {
      this.jobStatusOptions = response.data;
    });
    this.getDicts("sys_delete_status").then(response => {
      this.delFlagOptions = response.data;
    });
  },
  watch: {
    // 监听jobPath
    'form.jobPath': 'currJobPathChange'
  },
  methods: {
    /** 查询作业管理列表 */
    getList() {
      this.loading = true;
      listJob(this.queryParams).then(response => {
        this.jobList = response.rows;
        this.total = response.total;
        this.loading = false;
      });
    },
    // 任务分类字典翻译
    taskCategoryFormat(row, column) {
      return this.selectDictLabel(this.taskCategoryOptions, row.taskCategory);
    },
    // 执行类型字典翻译
    jobTypeFormat(row, column) {
      return this.selectDictLabel(this.jobTypeOptions, row.jobType);
    },
    // 日志级别字典翻译
    jobLogLevelFormat(row, column) {
      return this.selectDictLabel(this.jobLogLevelOptions, row.jobLogLevel);
    },
    // 状态字典翻译
    jobStatusFormat(row, column) {
      return this.selectDictLabel(this.jobStatusOptions, row.jobStatus);
    },
    // 是否删除字典翻译
    delFlagFormat(row, column) {
      return this.selectDictLabel(this.delFlagOptions, row.delFlag);
    },
    // 取消按钮
    cancel() {
      this.open = false;
      this.reset();
    },
    // 表单重置
    reset() {
      this.form = {
        id: null,
        categoryId: null,
        taskCategory: null,
        jobName: null,
        jobDescription: null,
        jobType: null,
        jobPath: null,
        jobRepositoryId: null,
        jobQuartz: null,
        cronExpression: null,
        syncStrategy: null,
        jobLogLevel: "Basic",
        jobStatus: "1",
        delFlag: null,
        jobParams: null,
        lastValidTime: null,
        successCount: null,
        errorCount: null,
        createBy: null,
        createTime: null,
        updateBy: null,
        updateTime: null,
        remark: null
      };
      this.resetForm("form");
    },
    /** 详细按钮操作 */
    handleView(row) {
      this.form = row;
      this.openView = true;
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
      this.ids = selection.map(item => item.id)
      this.single = selection.length!==1
      this.multiple = !selection.length
    },
    /** 新增按钮操作 */
    handleAdd() {
      this.reset();
      this.open = true;
      this.jobDisabled = false;
      this.title = "添加作业管理";
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      // 判断是否是执行状态
      if (row.jobStatus == '0') {
        this.msgError("启动状态的作业不允许修改!");
      } else {
        this.reset();
        const id = row.id || this.ids
        // this.jobSelectChanged(row.jobRepositoryId);
        getJob(id).then(response => {
          this.form = response.data;
          this.open = true;
          this.jobDisabled = true;
          this.title = "修改作业管理";
        });
      }
    },
    /** 提交按钮 */
    submitForm() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          if (this.form.id != null) {
            updateJob(this.form).then(response => {
              this.msgSuccess("修改成功");
              this.open = false;
              this.getList();
            });
          } else {
            addJob(this.form).then(response => {
              this.msgSuccess("新增成功");
              this.open = false;
              this.getList();
            });
          }
        }
      });
    },
    /** 删除按钮操作 */
    handleDelete(row) {
      const ids = row.id || this.ids;
      this.$confirm('是否确认删除作业管理编号为"' + ids + '"的数据项?', "警告", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }).then(function() {
          return delJob(ids);
        }).then(() => {
          this.getList();
          this.msgSuccess("删除成功");
        })
    },
    /** 导出按钮操作 */
    handleExport() {
      const queryParams = this.queryParams;
      this.$confirm('是否确认导出所有作业管理数据项?', "警告", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }).then(function() {
          return exportJob(queryParams);
        }).then(response => {
          this.download(response.msg);
        })
    },

    /** 作业执行日志列表 */
    handleJobLog(row) {
      this.$router.push("/kettle/task/jobLog");
    },

    /* 立即执行一次 */
    handleRun(row) {
      this.$confirm('确认要立即执行一次【' + row.jobName + '】作业吗?', "警告", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(function() {
        return runJob(row.id);
      }).then(() => {
        this.msgSuccess("作业开始执行");
      })
    },
    // 任务状态修改
    handleStatusChange(row) {
      let text = row.jobStatus === "0" ? "启用" : "停用";
      this.$confirm('确认要"' + text + '" 【' + row.jobName + '】作业吗?', "警告", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(function() {
        return changeJobStatus(row.id, row.jobStatus);
      }).then(() => {
        this.msgSuccess(text + "成功");
      }).catch(function() {
        row.jobStatus = row.jobStatus === "0" ? "1" : "0";
      });
    },
    // 上传
    ktrBeforeUpload(file) {
      let isRightSize = file.size / 1024 / 1024 < 2
      if (!isRightSize) {
        this.$message.error('文件大小超过 2MB')
      }
      let isAccept = new RegExp('image/*').test(file.type)
      if (!isAccept) {
        this.$message.error('应该选择image/*类型的文件')
      }
      return isRightSize && isAccept
    },

    // 资源库的change事件
    jobSelectChanged(value) {
      this.loadingJob = true;
      this.getJobPathOptions(value);
    },
    // Treeselect替代属性
    normalizer(node) {
      if (!node.children) {
        delete node.children;
      }
      return {
        id: node.extra,
        label: node.text,
        children: node.children,
      }
    },
    // 打开资源库
    getJobPathOptions(id){
      findJobRepTree(id).then(response => {
        this.jobPathOptions = response.data;
        this.loadingJob = false;
      });
    },
    // 作业名称随作业路径改变
    inputChange(){
      this.form.jobName = jobPath.split("/")[jobPath.split("/").length-1];
    },

    // 作业名称随作业路径改变
    currJobPathChange(jobPath,oldJobPath){
      if(this.open && jobPath){
        // this.form.jobName = jobPath;
        this.form.jobName = jobPath.split("/")[jobPath.split("/").length-1];
      }
    },
  }
};
</script>
