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
      <el-form-item label="转换名称" prop="transName">
        <el-input
          v-model="queryParams.transName"
          placeholder="请输入转换名称"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="状态" prop="transStatus">
        <el-select v-model="queryParams.transStatus" placeholder="请选择状态" clearable size="small">
          <el-option
            v-for="dict in transStatusOptions"
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
          v-hasPermi="['kettle:trans:add']"
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
          v-hasPermi="['kettle:trans:edit']"
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
          v-hasPermi="['kettle:trans:remove']"
        >删除</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="warning"
          plain
          icon="el-icon-download"
          size="mini"
          @click="handleExport"
          v-hasPermi="['kettle:trans:export']"
        >导出</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="info"
          plain
          icon="el-icon-s-operation"
          size="mini"
          @click="handleJobLog"
          v-hasPermi="['kettle:trans:list']"
        >日志</el-button>
      </el-col>
      <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar>
    </el-row>

    <el-table v-loading="loading" :data="transList" @selection-change="handleSelectionChange">
      <el-table-column width="25" type="selection" align="center" />
      <el-table-column width="80" label="转换ID" align="center" prop="id" />
      <el-table-column width="80" label="任务分类" align="center" prop="taskCategory" :formatter="taskCategoryFormat" />
      <el-table-column width="180" label="转换名称" align="center" prop="transName" />
      <el-table-column width="280" label="转换描述" align="center" prop="transDescription" />
<!--      <el-table-column width="150" label="执行类型" align="center" prop="transType" :formatter="transTypeFormat" />-->
      <el-table-column width="500" label="转换保存路径" align="center" prop="transPath" />
<!--      <el-table-column width="80" label="转换的资源库ID" align="center" prop="transRepositoryId" />-->
<!--      <el-table-column width="80" label="定时策略" align="center" prop="transQuartz" />-->
      <el-table-column width="180" label="cron执行表达式" align="center" prop="cronExpression" />
<!--      <el-table-column width="80" label="日志级别" align="center" prop="transLogLevel" :formatter="transLogLevelFormat" />-->
      <el-table-column width="80" label="状态" align="center" :formatter="transStatusFormat">
        <template slot-scope="scope">
          <el-switch
            v-model="scope.row.transStatus"
            active-value="0"
            inactive-value="1"
            @change="handleStatusChange(scope.row)"
          ></el-switch>
        </template>
      </el-table-column>
<!--      <el-table-column width="180" label="修改时间" align="center" prop="updateTime" />-->
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="text"
            icon="el-icon-caret-right"
            @click="handleRun(scope.row)"
            v-hasPermi="['kettle:trans:changeStatus']"
          >执行一次</el-button>
<!--          <el-button-->
<!--            type="text"-->
<!--            icon="el-icon-s-operation"-->
<!--            size="mini"-->
<!--            @click="handleJobLog(scope.row)"-->
<!--            v-hasPermi="['kettle:trans:list']"-->
<!--          >日志</el-button>-->
          <el-button
            size="mini"
            type="text"
            icon="el-icon-view"
            @click="handleView(scope.row)"
            v-hasPermi="['kettle:trans:query']"
          >详细
          </el-button>
          <el-button
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="handleUpdate(scope.row)"
            v-hasPermi="['kettle:trans:edit']"
          >修改</el-button>
          <el-button
            size="mini"
            type="text"
            icon="el-icon-delete"
            @click="handleDelete(scope.row)"
            v-hasPermi="['kettle:trans:remove']"
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

    <!-- 添加或修改转换管理对话框 -->
    <el-dialog :title="title" :visible.sync="open" width="1000px" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="130px" v-loading="loadingTrans">
        <el-form-item label="执行方式" prop="transType">
          <el-select v-model="form.transType" placeholder="请选择执行类型" :style="{width: '100%'}">
            <el-option
              v-for="dict in transTypeOptions"
              :key="dict.dictValue"
              :label="dict.dictLabel"
              :value="dict.dictValue"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="转换资源库" prop="transRepositoryId">
          <el-select v-model="form.transRepositoryId" placeholder="请选择资源库" :style="{width: '100%'}" @change="transSelectChanged">
            <el-option
              v-for="dict in repositoryOptions"
              :key="dict.id"
              :label="dict.repName"
              :value="dict.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="转换路径" prop="transPath">
          <treeselect
            v-model="form.transPath"
            placeholder="请选择转换"
            :show-count="true"
            :show-all-levels="true"
            search-nested
            :options="transPathOptions"
            :props="transPathProps"
            :normalizer="normalizer"
            :disable-branch-nodes="true"
          />
        </el-form-item>
<!--        <el-form-item label="转换上传" prop="ktr" required>-->
<!--          <el-upload ref="ktr" :file-list="ktrfileList" :action="ktrAction" :before-upload="ktrBeforeUpload"-->
<!--                     accept="image/*">-->
<!--            <el-button size="small" type="primary" icon="el-icon-upload">上传转换</el-button>-->
<!--            <div slot="tip" class="el-upload__tip">只能上传不超过 2MB 的image/*文件</div>-->
<!--          </el-upload>-->
<!--        </el-form-item>-->
        <el-form-item label="转换名称" prop="transName">
          <el-input v-model="form.transName" placeholder="请输入转换名称" />
        </el-form-item>
        <el-form-item label="任务分类" prop="taskCategory">
          <el-select v-model="form.taskCategory" placeholder="请选择任务分类" :style="{width: '100%'}" >
            <el-option
              v-for="dict in taskCategoryOptions"
              :key="dict.dictValue"
              :label="dict.dictLabel"
              :value="dict.dictValue"
            ></el-option>
          </el-select>
        </el-form-item>
<!--        <el-form-item label="定时策略" prop="transQuartz">-->
<!--          <el-input v-model="form.transQuartz" placeholder="请输入定时策略" />-->
<!--        </el-form-item>-->
<!--        <el-form-item label="同步策略(T+n)" prop="syncStrategy">-->
<!--          <el-input v-model="form.syncStrategy" placeholder="请输入同步策略(T+n)" />-->
<!--        </el-form-item>-->
        <el-form-item label="cron执行表达式" prop="cronExpression">
          <el-input v-model="form.cronExpression" placeholder="请输入cron执行表达式" />
        </el-form-item>
        <el-form-item label="日志级别" prop="transLogLevel">
          <el-select v-model="form.transLogLevel" placeholder="请选择日志级别" :style="{width: '100%'}">
            <el-option
              v-for="dict in transLogLevelOptions"
              :key="dict.dictValue"
              :label="dict.dictLabel"
              :value="dict.dictValue"
            ></el-option>
          </el-select>
        </el-form-item>
<!--        <el-form-item label="状态">-->
<!--          <el-radio-group v-model="form.transStatus">-->
<!--            <el-radio-->
<!--              v-for="dict in transStatusOptions"-->
<!--              :key="dict.dictValue"-->
<!--              :label="dict.dictValue"-->
<!--            >{{dict.dictLabel}}</el-radio>-->
<!--          </el-radio-group>-->
<!--        </el-form-item>-->
<!--        <el-form-item label="转换参数" prop="transParams">-->
<!--          <el-input v-model="form.transParams" type="textarea" placeholder="请输入内容" />-->
<!--        </el-form-item>-->
        <el-form-item label="转换描述" prop="transDescription">
          <el-input v-model="form.transDescription" type="textarea" placeholder="请输入内容" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitForm">确 定</el-button>
        <el-button @click="cancel">取 消</el-button>
      </div>
    </el-dialog>

    <!-- 任务日志详细 -->
    <el-dialog title="转换详细" :visible.sync="openView" width="800px" append-to-body>
      <el-form ref="form" :model="form" label-width="120px" size="mini">
        <el-row>
          <el-col :span="12">
            <el-form-item label="转换ID：">{{ form.id }}</el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="转换名称：">{{ form.transName }}</el-form-item>
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
            <el-form-item label="执行类型：">{{ transTypeFormat(form) }}</el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="日志级别：">{{ transLogLevelFormat(form) }}</el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="状态：">
              <div v-if="form.transStatus == '0'">启动</div>
              <div v-else-if="form.transStatus == '1'">暂停</div>
              <div v-else>未知</div>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="转换保存路径：">{{ form.transPath }}</el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="转换描述：">{{ form.transDescription }}</el-form-item>
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
import { listTrans, getTrans, delTrans, addTrans, updateTrans, exportTrans, runJob, changeJobStatus, getRepositoryDict, findTransRepTree } from "@/api/kettle/trans";
import Treeselect from "@riophae/vue-treeselect";
import "@riophae/vue-treeselect/dist/vue-treeselect.css";

  export default {
    name: "Trans",
    components: {
      Treeselect
    },
    data() {
      return {
        // 遮罩层
        loading: true,
        // 遮罩层 转换窗口
        loadingTrans: false,
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
        // 转换管理表格数据
        transList: [],
        // 弹出层标题
        title: "",
        // 是否显示弹出层
        open: false,
        // 是否显示详细弹出层
        openView: false,
        // 资源库
        repositoryOptions: [],
        // 任务分类字典
        taskCategoryOptions: [],
        // 执行类型字典
        transTypeOptions: [],
        // 日志级别字典
        transLogLevelOptions: [],
        // 状态字典
        transStatusOptions: [],
        // 查询参数
        queryParams: {
          pageNum: 1,
          pageSize: 10,
          categoryId: null,
          taskCategory: null,
          transName: null,
          transDescription: null,
          transType: null,
          transPath: null,
          transRepositoryId: null,
          transQuartz: null,
          cronExpression: null,
          syncStrategy: null,
          transLogLevel: null,
          transStatus: null,
          transParams: null,
          lastValidTime: null,
          successCount: null,
          errorCount: null,
        },
        ktrAction: 'https://jsonplaceholder.typicode.com/posts/',
        ktrfileList: [],
        // 表单参数
        form: {},
        // 表单校验
        rules: {
          taskCategory: [
            { required: true, message: "任务分类不能为空", trigger: "blur" }
          ],
          transName: [
            { required: true, message: "转换名称不能为空", trigger: "blur" }
          ],
          transType: [
            { required: true, message: "执行类型不能为空", trigger: "change" }
          ],
          transPath: [
            { required: true, message: "转换保存路径不能为空", trigger: "blur" }
          ],
          transRepositoryId: [
            { required: true, message: "转换的资源库ID不能为空", trigger: "blur" }
          ],
          cronExpression: [
            { required: true, message: "cron执行表达式不能为空", trigger: "blur" }
          ],
          transLogLevel: [
            { required: true, message: "日志级别不能为空", trigger: "blur" }
          ],
          transStatus: [
            { required: true, message: "状态不能为空", trigger: "blur" }
          ],
        },
        // 资源库中trans转换内容树选项
        transPathOptions: [],
        transPathProps: {
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
      // this.getTransPathOptions(id);
      this.getDicts("kettle_task_category").then(response => {
        this.taskCategoryOptions = response.data;
      });
      this.getDicts("kettle_run_type").then(response => {
        this.transTypeOptions = response.data;
      });
      this.getDicts("kettle_log_level").then(response => {
        this.transLogLevelOptions = response.data;
      });
      this.getDicts("sys_job_status").then(response => {
        this.transStatusOptions = response.data;
      });
    },
    methods: {
      /** 查询转换管理列表 */
      getList() {
        this.loading = true;
        listTrans(this.queryParams).then(response => {
          this.transList = response.rows;
          this.total = response.total;
          this.loading = false;
        });
      },
      // 任务分类字典翻译
      taskCategoryFormat(row, column) {
        return this.selectDictLabel(this.taskCategoryOptions, row.taskCategory);
      },
      // 执行类型字典翻译
      transTypeFormat(row, column) {
        return this.selectDictLabel(this.transTypeOptions, row.transType);
      },
      // 日志级别字典翻译
      transLogLevelFormat(row, column) {
        return this.selectDictLabel(this.transLogLevelOptions, row.transLogLevel);
      },
      // 状态字典翻译
      transStatusFormat(row, column) {
        return this.selectDictLabel(this.transStatusOptions, row.transStatus);
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
          transName: null,
          transDescription: null,
          transType: null,
          transPath: null,
          transRepositoryId: null,
          transQuartz: null,
          cronExpression: null,
          syncStrategy: null,
          transLogLevel: "Basic",
          transStatus: "1",
          delFlag: null,
          transParams: null,
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
        // 重置转换路径选项
        this.transPathOptions = [];
        this.open = true;
        this.title = "添加转换管理";
      },
      /** 修改按钮操作 */
      handleUpdate(row) {
        // 判断是否是执行状态
        if(row.transStatus == '0'){
          this.msgError("启动状态的转换不允许修改!");
        } else {
          this.reset();
          this.getTransPathOptions(row.transRepositoryId)
          const id = row.id || this.ids
          getTrans(id).then(response => {
            this.form = response.data;
            this.open = true;
            this.title = "修改转换管理";
          });
        }
      },
      /** 提交按钮 */
      submitForm() {
        this.$refs["form"].validate(valid => {
          if (valid) {
            if (this.form.id != null) {
              updateTrans(this.form).then(response => {
                this.msgSuccess("修改成功");
                this.open = false;
                this.getList();
              });
            } else {
              addTrans(this.form).then(response => {
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
        this.$confirm('是否确认删除转换管理编号为"' + ids + '"的数据项?', "警告", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }).then(function() {
          return delTrans(ids);
        }).then(() => {
          this.getList();
          this.msgSuccess("删除成功");
        })
      },
      /** 导出按钮操作 */
      handleExport() {
        const queryParams = this.queryParams;
        this.$confirm('是否确认导出所有转换管理数据项?', "警告", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }).then(function() {
          return exportTrans(queryParams);
        }).then(response => {
          this.download(response.msg);
        })
      },

      /** 转换执行日志列表 */
      handleJobLog(row) {
        this.$router.push("/kettle/task/transLog");
        // this.$router.push("/kettle/task/transLog/"+row.transId);
        // this.$router.push({
        //   name: '/kettle/task/transLog',
        // //   query: {transId: row.transId}
        // });
      },

      /* 立即执行一次 */
      handleRun(row) {
        this.$confirm('确认要立即执行一次【' + row.transName + '】转换吗?', "警告", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }).then(function() {
          return runJob(row.id);
        }).then(() => {
          this.msgSuccess("转换开始执行");
        })
      },
      // 任务状态修改
      handleStatusChange(row) {
        let text = row.transStatus === "0" ? "启用" : "停用";
        this.$confirm('确认要"' + text + '" 【' + row.transName + '】转换吗?', "警告", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }).then(function() {
          return changeJobStatus(row.id, row.transStatus);
        }).then(() => {
          this.msgSuccess(text + "成功");
        }).catch(function() {
          row.transStatus = row.transStatus === "0" ? "1" : "0";
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
      transSelectChanged(value) {
        this.loadingTrans = true;
        this.getTransPathOptions(value);
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
      getTransPathOptions(id){
        findTransRepTree(id).then(response => {
          this.transPathOptions = response.data;
          this.loadingTrans = false;
        });
      },

    }
  };
</script>
<style>
  .el-upload__tip {
    line-height: 1.2;
  }

</style>
