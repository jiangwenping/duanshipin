<template>
  <div class="dashboard-editor-container">
    <panel-group/>
    <el-tabs style="margin-top:0;" type="border-card" v-model="active">
      <el-tab-pane key="1" label="账户对比概览" name="account-overview">
        <el-form :inline="true">
          <el-form-item label="查看数据:">
            <el-select
                clearable
                size="small"
                style="width: 240px"
                v-model="valueType"
            >
              <el-option
                  v-for="dict in roleType"
                  :key="dict.value"
                  :label="dict.label"
                  :value="dict.value"
              />
            </el-select>
          </el-form-item>
          <el-form-item label="选择时间:">
            <el-date-picker
                size="small"
                style="width: 240px"
                value-format="yyyy-MM-dd"
                type="daterange"
                range-separator="-"
                start-placeholder="开始日期"
                end-placeholder="结束日期">
            </el-date-picker>
            <el-button class="filter-item" type="primary" icon="el-icon-search">
              搜索
            </el-button>
          </el-form-item>
        </el-form>
        <div style="float: left;width: 520px">
          <pie-chart/>
        </div>
        <div style="float: left;margin-left:50px;width: 520px">
          <line-chart :chart-data="lineChartData" ref="Chart"/>
        </div>
      </el-tab-pane>
      <el-tab-pane key="2" label="视频TOP10" name="video-top10">
        <el-form :inline="true">
          <el-form-item label="筛选数据:">
            <el-select
                clearable
                size="small"
                style="width: 240px"
                v-model="valueType"
            >
              <el-option
                  v-for="dict in roleType"
                  :key="dict.value"
                  :label="dict.label"
                  :value="dict.value"
              />
            </el-select>
          </el-form-item>
          <el-button class="filter-item" type="primary" icon="el-icon-search">
            搜索
          </el-button>
        </el-form>
        <el-table
            :data="tableData"
            tooltip-effect="dark"
            :header-cell-style="{background:'#f8f8f9',color:'#515a6e'}"
            style="width: 100%;margin-top:10px;"
            @selection-change="handleSelectionChange"
        >
          <el-table-column label="日期" width="120">
            <template slot-scope="scope">{{ scope.row.date }}</template>
          </el-table-column>
          <el-table-column prop="name" label="姓名" width="120"></el-table-column>
          <el-table-column prop="address" label="地址" show-overflow-tooltip>
          </el-table-column>
          <el-table-column
              prop="tag"
              label="标签"
              width="100">
            <template slot-scope="scope">
              <el-tag
                  :type="scope.row.tag === '家' ? 'primary' : 'success'"
                  disable-transitions>{{ scope.row.tag }}
              </el-tag>
            </template>
          </el-table-column>
        </el-table>
      </el-tab-pane>
    </el-tabs>

    <el-row style="margin-top: 20px">
      <el-col :xs="{span: 24}" :sm="{span: 24}" :md="{span: 24}" :lg="{span: 12}" :xl="{span: 12}" style="padding-right:8px;margin-bottom:30px;">
        <transaction-table/>
      </el-col>
      <el-col :xs="{span: 24}" :sm="{span: 24}" :md="{span: 24}" :lg="{span: 12}" :xl="{span: 12}" style="margin-bottom:30px;">
        <transaction-table/>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import GithubCorner from '@/components/GithubCorner'
import PanelGroup from './components/PanelGroup'
import LineChart from './components/LineChart'
import RaddarChart from './components/RaddarChart'
import PieChart from './components/PieChart'
import BarChart from './components/BarChart'
import TransactionTable from './components/TransactionTable'
import TodoList from './components/TodoList'
import BoxCard from './components/BoxCard'

const lineChartData = {
  newVisitis: {
    expectedData: [100, 120, 161, 134, 105, 160, 165],
    actualData: [120, 82, 91, 154, 162, 140, 145]
  },
  messages: {
    expectedData: [200, 192, 120, 144, 160, 130, 140],
    actualData: [180, 160, 151, 106, 145, 150, 130]
  },
  purchases: {
    expectedData: [80, 100, 121, 104, 105, 90, 100],
    actualData: [120, 90, 100, 138, 142, 130, 130]
  },
  shoppings: {
    expectedData: [130, 140, 141, 142, 145, 150, 160],
    actualData: [120, 82, 91, 154, 162, 140, 130]
  }
}

export default {
  name: 'DashboardAdmin',
  components: {
    GithubCorner,
    PanelGroup,
    LineChart,
    RaddarChart,
    PieChart,
    BarChart,
    TransactionTable,
    TodoList,
    BoxCard
  },
  data() {
    return {
      lineChartData: lineChartData.newVisitis,
      active: 'account-overview',
      valueType: 2,
      roleType: [{
        label: "视频总数",
        value: 1
      }, {
        label: "播放总数",
        value: 2
      }, {
        label: "点赞总数",
        value: 3
      }, {
        label: "分享总数",
        value: 4
      }, {
        label: "粉丝总数",
        value: 4
      }],
      tableData: [{
        date: '2017-05-01',
        name: '杜小虎',
        address: '上海市普陀区金沙江路 1518 弄',
        tag: '家'
      }, {
        date: '2017-05-01',
        name: '杜小虎',
        address: '上海市普陀区金沙江路 1517 弄',
        tag: '公司'
      }, {
        date: '2017-05-01',
        name: '杜小虎',
        address: '上海市普陀区金沙江路 1519 弄',
        tag: '家'
      }, {
        date: '2017-05-01',
        name: '杜小虎',
        address: '上海市普陀区金沙江路 1519 弄',
        tag: '家'
      }, {
        date: '2017-05-01',
        name: '杜小虎',
        address: '上海市普陀区金沙江路 1519 弄',
        tag: '家'
      }, {
        date: '2017-05-01',
        name: '杜小虎',
        address: '上海市普陀区金沙江路 1519 弄',
        tag: '家'
      }, {
        date: '2017-05-01',
        name: '杜小虎',
        address: '上海市普陀区金沙江路 1519 弄',
        tag: '家'
      }, {
        date: '2017-05-01',
        name: '杜小虎',
        address: '上海市普陀区金沙江路 1519 弄',
        tag: '家'
      }, {
        date: '2017-05-01',
        name: '杜小虎',
        address: '上海市普陀区金沙江路 1516 弄',
        tag: '公司'
      }],
    }
  },
  methods: {
    handleSelectionChange(val) {
      this.multipleSelection = val;
    }
  }
}
</script>

<style lang="scss" scoped>
.dashboard-editor-container {
  padding: 32px;
  background-color: rgb(240, 242, 245);
  position: relative;

  .github-corner {
    position: absolute;
    top: 0px;
    border: 0;
    right: 0;
  }

  .chart-wrapper {
    background: #fff;
    padding: 16px 16px 0;
    margin-bottom: 32px;
  }

  .filter-item {
    padding: 10px;
    margin-left: 15px;
  }
}

@media (max-width: 1024px) {
  .chart-wrapper {
    padding: 8px;
  }
}
</style>
