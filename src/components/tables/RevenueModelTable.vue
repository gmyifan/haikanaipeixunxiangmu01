<template>
  <div class="revenue-model-table">
    <h3 class="table-title">多元化盈利模式</h3>
    <p class="table-subtitle">构建短、中、长期相结合的盈利模式</p>
    
    <el-table 
      :data="revenueData" 
      style="width: 100%"
      :row-class-name="tableRowClassName"
      border
      stripe
      :default-sort="{ prop: 'timeline', order: 'ascending' }"
    >
      <el-table-column prop="timeline" label="时间周期" width="120" align="center" sortable>
        <template #default="{ row }">
          <el-tag :type="getTimelineColor(row.timeline)" size="small">
            {{ row.timeline }}
          </el-tag>
        </template>
      </el-table-column>
      
      <el-table-column prop="model" label="盈利模式" width="180">
        <template #default="{ row }">
          <div class="model-info">
            <span class="model-name">{{ row.model }}</span>
            <span class="model-desc">{{ row.description }}</span>
          </div>
        </template>
      </el-table-column>
      
      <el-table-column prop="services" label="具体服务" min-width="250">
        <template #default="{ row }">
          <div class="services-content">
            <div 
              v-for="(service, index) in row.services" 
              :key="index"
              class="service-item"
            >
              <el-icon class="service-icon"><Star /></el-icon>
              <span>{{ service.name }}</span>
              <span class="service-detail">{{ service.detail }}</span>
            </div>
          </div>
        </template>
      </el-table-column>
      
      <el-table-column prop="revenue" label="收入特点" width="140" align="center">
        <template #default="{ row }">
          <div class="revenue-info">
            <span class="revenue-type">{{ row.revenue.type }}</span>
            <span class="revenue-desc">{{ row.revenue.description }}</span>
          </div>
        </template>
      </el-table-column>
      
      <el-table-column prop="priority" label="优先级" width="100" align="center">
        <template #default="{ row }">
          <el-progress 
            :percentage="row.priority" 
            :color="getPriorityColor(row.priority)"
            :stroke-width="6"
            :show-text="false"
          />
          <span class="priority-text">{{ row.priority }}%</span>
        </template>
      </el-table-column>
    </el-table>

    <div class="model-summary">
      <div class="summary-card" v-for="(summary, index) in summaryData" :key="index">
        <div class="summary-icon" :style="{ color: summary.color }">
          <component :is="summary.icon" />
        </div>
        <div class="summary-content">
          <h4>{{ summary.title }}</h4>
          <p>{{ summary.description }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'
import { Star, TrendCharts, Coin, Trophy } from '@element-plus/icons-vue'

export default {
  name: 'RevenueModelTable',
  components: {
    Star, TrendCharts, Coin, Trophy
  },
  setup() {
    const revenueData = ref([
      {
        timeline: '短期',
        model: '培训服务收费',
        description: '现金流业务',
        services: [
          { name: 'B2B企业内训', detail: '高客单价定制化内训' },
          { name: 'G2B政府项目', detail: '教师AI素养提升、公务员AI轮训' },
          { name: '认证培训', detail: '人工智能训练师等认证培训' }
        ],
        revenue: {
          type: '稳定现金流',
          description: '项目制收费'
        },
        priority: 90
      },
      {
        timeline: '中期',
        model: '"培训+"增值服务',
        description: '增长点业务',
        services: [
          { name: '咨询与解决方案', detail: '诊断+咨询+工具一体化方案' },
          { name: 'AI代运营服务', detail: 'AIGC内容生成、AI搜索优化' },
          { name: '渠道产品包', detail: '全省广电系统AI培训产品包' }
        ],
        revenue: {
          type: '增值收入',
          description: '服务升维收费'
        },
        priority: 70
      },
      {
        timeline: '长期',
        model: '生态平台服务',
        description: '价值业务',
        services: [
          { name: '标准制定与授权', detail: '广电垂类AIGC标准制定' },
          { name: '线上平台收益', detail: '课程付费、会员订阅' },
          { name: '生态闭环', detail: '培训+咨询+工具+平台' }
        ],
        revenue: {
          type: '持续性收入',
          description: '平台化收益'
        },
        priority: 50
      }
    ])

    const summaryData = ref([
      {
        icon: 'TrendCharts',
        title: '稳健启动',
        description: '第一年成本与营收基本持平',
        color: '#10b981'
      },
      {
        icon: 'Star',
        title: '模式验证',
        description: '打造1-2个G端标杆项目',
        color: '#f59e0b'
      },
      {
        icon: 'Coin',
        title: '多元收入',
        description: '短期现金流+中期增长+长期价值',
        color: '#3b82f6'
      },
      {
        icon: 'Trophy',
        title: '生态构建',
        description: '成为山东AI人才基础设施核心承载者',
        color: '#8b5cf6'
      }
    ])

    const getTimelineColor = (timeline) => {
      const colorMap = {
        '短期': 'success',
        '中期': 'warning',
        '长期': 'danger'
      }
      return colorMap[timeline] || ''
    }

    const getPriorityColor = (priority) => {
      if (priority >= 80) return '#10b981'
      if (priority >= 60) return '#f59e0b'
      return '#ef4444'
    }

    const tableRowClassName = ({ row, rowIndex }) => {
      if (row.timeline === '短期') {
        return 'short-term-row'
      }
      return ''
    }

    return {
      revenueData,
      summaryData,
      getTimelineColor,
      getPriorityColor,
      tableRowClassName
    }
  }
}
</script>

<style scoped>
.revenue-model-table {
  margin: 24px 0;
}

.table-title {
  font-size: 20px;
  font-weight: 600;
  color: #1f2937;
  margin: 0 0 8px 0;
  text-align: center;
}

.table-subtitle {
  font-size: 14px;
  color: #6b7280;
  margin: 0 0 20px 0;
  text-align: center;
}

.model-info {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.model-name {
  font-weight: 500;
  color: #1f2937;
}

.model-desc {
  font-size: 12px;
  color: #6b7280;
}

.services-content {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.service-item {
  display: flex;
  align-items: flex-start;
  gap: 6px;
  font-size: 13px;
  color: #374151;
  line-height: 1.4;
}

.service-icon {
  color: #f59e0b;
  font-size: 14px;
  margin-top: 2px;
  flex-shrink: 0;
}

.service-detail {
  color: #6b7280;
  font-size: 12px;
}

.revenue-info {
  display: flex;
  flex-direction: column;
  gap: 2px;
  align-items: center;
}

.revenue-type {
  font-weight: 500;
  color: #1e3a8a;
  font-size: 13px;
}

.revenue-desc {
  font-size: 11px;
  color: #6b7280;
}

.priority-text {
  font-size: 12px;
  color: #6b7280;
  margin-top: 4px;
}

.model-summary {
  margin-top: 24px;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 16px;
}

.summary-card {
  display: flex;
  align-items: flex-start;
  gap: 12px;
  padding: 16px;
  background: white;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  transition: all 0.2s ease;
}

.summary-card:hover {
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  transform: translateY(-2px);
}

.summary-icon {
  font-size: 24px;
  flex-shrink: 0;
}

.summary-content h4 {
  margin: 0 0 4px 0;
  font-size: 14px;
  font-weight: 600;
  color: #1f2937;
}

.summary-content p {
  margin: 0;
  font-size: 12px;
  color: #6b7280;
  line-height: 1.4;
}

:deep(.short-term-row) {
  background-color: #f0fdf4 !important;
}

:deep(.el-table__row:hover) {
  background-color: #f0f9ff !important;
}

:deep(.el-table__row.short-term-row:hover) {
  background-color: #dcfce7 !important;
}

@media (max-width: 768px) {
  .model-summary {
    grid-template-columns: 1fr;
  }
  
  .service-item {
    flex-direction: column;
    align-items: flex-start;
    gap: 2px;
  }
}
</style>