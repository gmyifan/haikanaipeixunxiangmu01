<template>
  <div class="partnership-table">
    <h3 class="table-title">生态合作矩阵</h3>
    <p class="table-subtitle">我们不造轮子，我们链接资源，构建AI培训生态</p>
    
    <el-table 
      :data="partnershipData" 
      style="width: 100%"
      :row-class-name="tableRowClassName"
      border
      stripe
    >
      <el-table-column prop="type" label="合作类型" width="120" align="center">
        <template #default="{ row }">
          <el-tag :type="getTypeColor(row.type)" size="small">
            {{ row.type }}
          </el-tag>
        </template>
      </el-table-column>
      
      <el-table-column prop="partner" label="合作伙伴" width="160">
        <template #default="{ row }">
          <div class="partner-info">
            <span class="partner-name">{{ row.partner }}</span>
          </div>
        </template>
      </el-table-column>
      
      <el-table-column prop="field" label="合作领域" width="140">
        <template #default="{ row }">
          <span class="field-text">{{ row.field }}</span>
        </template>
      </el-table-column>
      
      <el-table-column prop="coreContent" label="核心内容" min-width="300">
        <template #default="{ row }">
          <div class="core-content">
            <div v-for="(item, index) in row.coreContent" :key="index" class="content-item">
              {{ item }}
            </div>
          </div>
        </template>
      </el-table-column>
      
      <el-table-column label="详细信息" width="100" align="center">
        <template #default="{ row }">
          <el-button 
            type="text" 
            size="small" 
            @click="toggleDetails(row)"
            :icon="row.expanded ? 'ArrowUp' : 'ArrowDown'"
          >
            {{ row.expanded ? '收起' : '详情' }}
          </el-button>
        </template>
      </el-table-column>
      
      <el-table-column prop="strategicValue" label="战略价值" width="250">
        <template #default="{ row }">
          <span class="strategic-value">{{ row.strategicValue }}</span>
        </template>
      </el-table-column>
    </el-table>
    
    <!-- 展开的详细信息 -->
    <div class="expanded-details">
      <transition-group name="el-collapse-transition">
        <div v-for="(item, index) in expandedItems" :key="index" class="detail-card">
          <div class="detail-header">
            <div class="partner-info-large">
              <div class="partner-type">
                <el-tag :type="getTypeColor(item.type)" size="large">{{ item.type }}</el-tag>
              </div>
              <div class="partner-details">
                <h4 class="partner-name-large">{{ item.partner }}</h4>
                <p class="partner-field">{{ item.field }}</p>
              </div>
            </div>
            <el-button 
              type="text" 
              @click="toggleDetails(item)"
              icon="Close"
              class="close-btn"
            />
          </div>
          
          <div class="detail-content">
            <div class="content-section">
              <h5 class="section-title">
                <span class="title-icon">🤝</span>
                核心合作内容
              </h5>
              <div class="content-list">
                <div v-for="(content, idx) in item.coreContent" :key="idx" class="content-item-detail">
                  <el-icon class="item-icon"><Star /></el-icon>
                  <span>{{ content }}</span>
                </div>
              </div>
            </div>
            
            <div class="value-section">
              <h5 class="section-title">
                <span class="title-icon">💡</span>
                战略价值
              </h5>
              <p class="value-description">{{ item.strategicValue }}</p>
            </div>
          </div>
        </div>
      </transition-group>
    </div>

    <div class="table-summary">
      <div class="summary-item">
        <span class="summary-label">合作方总数：</span>
        <span class="summary-value">{{ partnershipData.length }}</span>
      </div>
      <div class="summary-item">
        <span class="summary-label">核心伙伴：</span>
        <span class="summary-value">{{ partnershipData.length }}</span>
      </div>
      <div class="summary-item">
        <span class="summary-label">战略覆盖：</span>
        <span class="summary-value">山东16地市</span>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed } from 'vue'
import { Star } from '@element-plus/icons-vue'

export default {
  name: 'PartnershipTable',
  components: {
    Star
  },
  setup() {
    const partnershipData = ref([
      {
        id: 1,
        type: '品牌破圈',
        partner: 'WayToAGI',
        field: '品牌破圈、社群运营',
        coreContent: [
          '联合在山东16地市举办"AI切磋大会"城市沙龙',
          '师资共享，共同承接政府及企业服务'
        ],
        strategicValue: '迅速提升海看在AI领域的品牌知名度，链接开发者与企业资源',
        expanded: false
      },
      {
        id: 2,
        type: '职业认证',
        partner: '长沙新视界',
        field: '职业认证、人才基建',
        coreContent: [
          '合作"人工智能训练师"、"智能体工程师"认证培训',
          '引进其"AI时代人才基础设施构建"模式'
        ],
        strategicValue: '快速补齐权威认证资质短板，构建国家认可的人才培养体系',
        expanded: false
      },
      {
        id: 3,
        type: '企业服务',
        partner: '东升成公司',
        field: '企业服务、营销培训',
        coreContent: [
          '合作GEO（AI搜索优化）培训',
          '联合开发B端企业客户，共享客户网络'
        ],
        strategicValue: '拓展新型AI营销服务，增强B端客户服务能力',
        expanded: false
      },
      {
        id: 4,
        type: '垂直人才',
        partner: '山东大学（数智学院等）',
        field: '垂直人才、产教融合',
        coreContent: [
          '共建"AI+短剧"专业人才培养体系',
          '海看交付培训，山大学生来海看基地实践操作'
        ],
        strategicValue: '深度赋能海看核心业务（短剧），打造产教融合标杆',
        expanded: false
      },
      {
        id: 5,
        type: 'AI+教育',
        partner: '飞象集团',
        field: 'AI+教育（G端）',
        coreContent: [
          '联合开发教师AI素养培训课程体系',
          '共同申报教育部门（省、市、县）培训项目'
        ],
        strategicValue: '快速切入G端教育市场蓝海，覆盖K12到成人的全年龄段',
        expanded: false
      },
      {
        id: 6,
        type: '行业标杆',
        partner: '千帆咨询',
        field: '行业标杆、垂直深耕',
        coreContent: [
          '锁定其优势领域（如服装行业）',
          '联合打造"服装行业AI应用"标杆案例'
        ],
        strategicValue: '树立垂直行业"AI+"赋能样板，形成可复制的解决方案',
        expanded: false
      },
      {
        id: 7,
        type: '资质背书',
        partner: '山东省大数据协会等',
        field: '资质背书、政府项目',
        coreContent: [
          '合作获取人社厅等部门的认证培训资质',
          '作为承接政府培训项目的合规主体'
        ],
        strategicValue: '解决业务合规性问题，获取G端项目"入场券"',
        expanded: false
      }
    ])

    const corePartners = computed(() => {
      return partnershipData.value.filter(p => p.value >= 4).length
    })

    const getTypeColor = (type) => {
      const colorMap = {
        '品牌破圈': 'primary',
        '职业认证': 'success',
        '企业服务': 'warning',
        '垂直人才': 'info',
        'AI+教育': 'danger',
        '行业标杆': 'primary',
        '资质背书': 'success'
      }
      return colorMap[type] || ''
    }

    const expandedItems = computed(() => {
      return partnershipData.value.filter(item => item.expanded)
    })

    const toggleDetails = (row) => {
      row.expanded = !row.expanded
    }

    const tableRowClassName = ({ row, rowIndex }) => {
      return ''
    }

    return {
      partnershipData,
      expandedItems,
      corePartners,
      getTypeColor,
      toggleDetails,
      tableRowClassName
    }
  }
}
</script>

<style scoped>
.partnership-table {
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

.partner-info {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.partner-name {
  font-weight: 500;
  color: #1f2937;
}

.partner-desc {
  font-size: 12px;
  color: #6b7280;
}

.field-text {
  font-size: 14px;
  color: #374151;
  font-weight: 500;
}

.core-content {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.content-item {
  font-size: 13px;
  color: #374151;
  line-height: 1.5;
  padding-left: 16px;
  position: relative;
}

.content-item::before {
  content: "•";
  position: absolute;
  left: 0;
  color: #6b7280;
  font-weight: bold;
}

.strategic-value {
  font-size: 13px;
  color: #059669;
  line-height: 1.5;
  font-weight: 500;
}

.cooperation-content {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.coop-item {
  font-size: 13px;
  color: #374151;
  padding: 2px 0;
}

.status-badge {
  display: inline-block;
}

.table-summary {
  margin-top: 20px;
  padding: 16px;
  background: #f8fafc;
  border-radius: 8px;
  display: flex;
  justify-content: space-around;
  border: 1px solid #e5e7eb;
}

.summary-item {
  text-align: center;
}

.summary-label {
  font-size: 14px;
  color: #6b7280;
  display: block;
  margin-bottom: 4px;
}

.summary-value {
  font-size: 18px;
  font-weight: 600;
  color: #1e3a8a;
}

:deep(.core-partner-row) {
  background-color: #fef3c7 !important;
}

:deep(.el-table__row:hover) {
  background-color: #f0f9ff !important;
}

:deep(.el-table__row.core-partner-row:hover) {
  background-color: #fed7aa !important;
}

/* 展开详情样式 */
.expanded-details {
  margin-top: 16px;
}

.detail-card {
  background: white;
  border-radius: 12px;
  padding: 24px;
  margin-bottom: 16px;
  border: 1px solid #e5e7eb;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
}

.detail-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.15);
}

.detail-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 24px;
  padding-bottom: 16px;
  border-bottom: 1px solid #f3f4f6;
}

.partner-info-large {
  display: flex;
  gap: 16px;
  align-items: flex-start;
}

.partner-type {
  flex-shrink: 0;
}

.partner-details {
  flex: 1;
}

.partner-name-large {
  font-size: 20px;
  font-weight: 600;
  color: #1f2937;
  margin: 0 0 8px 0;
  line-height: 1.3;
}

.partner-field {
  font-size: 14px;
  color: #6b7280;
  margin: 0;
  line-height: 1.4;
}

.close-btn {
  color: #6b7280;
  font-size: 18px;
  padding: 4px;
}

.close-btn:hover {
  color: #374151;
  background: #f3f4f6;
  border-radius: 4px;
}

.detail-content {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 32px;
}

.content-section,
.value-section {
  background: #f9fafb;
  border-radius: 8px;
  padding: 20px;
  border: 1px solid #e5e7eb;
}

.section-title {
  font-size: 16px;
  font-weight: 600;
  color: #374151;
  margin: 0 0 16px 0;
  display: flex;
  align-items: center;
  gap: 8px;
}

.title-icon {
  font-size: 18px;
}

.content-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.content-item-detail {
  display: flex;
  align-items: flex-start;
  gap: 8px;
  font-size: 14px;
  line-height: 1.5;
  color: #374151;
  padding: 8px;
  background: white;
  border-radius: 6px;
  border-left: 3px solid #3b82f6;
}

.item-icon {
  color: #3b82f6;
  font-size: 16px;
  flex-shrink: 0;
  margin-top: 2px;
}

.value-description {
  font-size: 14px;
  line-height: 1.6;
  color: #059669;
  margin: 0;
  padding: 12px;
  background: white;
  border-radius: 6px;
  border-left: 3px solid #10b981;
  font-weight: 500;
}

@media (max-width: 768px) {
  .table-summary {
    flex-direction: column;
    gap: 12px;
  }
  
  .summary-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  
  /* 详情卡片响应式 */
  .detail-header {
    flex-direction: column;
    gap: 16px;
  }
  
  .partner-info-large {
    flex-direction: column;
    gap: 12px;
  }
  
  .detail-content {
    grid-template-columns: 1fr;
    gap: 20px;
  }
  
  .content-section,
  .value-section {
    padding: 16px;
  }
  
  .section-title {
    font-size: 14px;
  }
  
  .content-item-detail {
    font-size: 13px;
    padding: 6px;
  }
  
  .value-description {
    font-size: 13px;
    padding: 10px;
  }
}
</style>