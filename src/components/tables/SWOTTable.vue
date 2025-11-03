<template>
  <div class="swot-table">
    <h3 class="table-title">SWOT分析</h3>
    <p class="table-subtitle">清醒认识自身优劣势，采取"借外脑"与"铸内功"相结合策略</p>
    
    <div class="swot-grid">
      <div class="swot-card strengths">
        <div class="card-header">
          <div class="card-icon">
            <el-icon><TrendCharts /></el-icon>
          </div>
          <h4>优势 (Strengths)</h4>
        </div>
        <div class="card-content">
          <div 
            v-for="(item, index) in swotData.strengths" 
            :key="index"
            class="swot-item"
          >
            <el-icon class="item-icon"><Star /></el-icon>
            <span>{{ item }}</span>
          </div>
        </div>
      </div>

      <div class="swot-card weaknesses">
        <div class="card-header">
          <div class="card-icon">
            <el-icon><Warning /></el-icon>
          </div>
          <h4>劣势 (Weaknesses)</h4>
        </div>
        <div class="card-content">
          <div 
            v-for="(item, index) in swotData.weaknesses" 
            :key="index"
            class="swot-item"
          >
            <el-icon class="item-icon"><Minus /></el-icon>
            <span>{{ item }}</span>
          </div>
        </div>
      </div>

      <div class="swot-card opportunities">
        <div class="card-header">
          <div class="card-icon">
            <el-icon><Opportunity /></el-icon>
          </div>
          <h4>机会 (Opportunities)</h4>
        </div>
        <div class="card-content">
          <div 
            v-for="(item, index) in swotData.opportunities" 
            :key="index"
            class="swot-item"
          >
            <el-icon class="item-icon"><Plus /></el-icon>
            <span>{{ item }}</span>
          </div>
        </div>
      </div>

      <div class="swot-card threats">
        <div class="card-header">
          <div class="card-icon">
            <el-icon><WarnTriangleFilled /></el-icon>
          </div>
          <h4>威胁 (Threats)</h4>
        </div>
        <div class="card-content">
          <div 
            v-for="(item, index) in swotData.threats" 
            :key="index"
            class="swot-item"
          >
            <el-icon class="item-icon"><Close /></el-icon>
            <span>{{ item }}</span>
          </div>
        </div>
      </div>
    </div>

    <div class="strategy-section">
      <h4 class="strategy-title">核心破局点：借外脑，铸内功</h4>
      <div class="strategy-grid">
        <div 
          v-for="(strategy, index) in strategies" 
          :key="index"
          class="strategy-card"
        >
          <div class="strategy-header">
            <div class="strategy-number">{{ index + 1 }}</div>
            <h5>{{ strategy.title }}</h5>
          </div>
          <div class="strategy-content">
            <div 
              v-for="(item, itemIndex) in strategy.items" 
              :key="itemIndex"
              class="strategy-item"
            >
              <span class="strategy-tag" :class="getStrategyTagClass(item.type)">
                {{ item.type }}
              </span>
              <span class="strategy-text">{{ item.content }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'
import { 
  TrendCharts, Warning, Opportunity, Star, Plus, Minus, Close, WarnTriangleFilled 
} from '@element-plus/icons-vue'

export default {
  name: 'SWOTTable',
  components: {
    TrendCharts, Warning, Opportunity, Star, Plus, Minus, Close, WarnTriangleFilled
  },
  setup() {
    const swotData = ref({
      strengths: [
        '国有品牌公信力强',
        '拥有广电媒体与政企资源网络',
        '自有AIGC平台等技术产品'
      ],
      weaknesses: [
        '缺乏专业培训资质与运营经验',
        '缺少AI领域专业师资',
        '在AI行业的品牌知名度尚未建立'
      ],
      opportunities: [
        '政策红利窗口期',
        '市场需求井喷',
        '技术与业务脱节的痛点明显'
      ],
      threats: [
        '成熟培训机构（如达内）的竞争',
        '科技巨头（如华为、百度）的竞争',
        'AI技术迭代快，课程易过时'
      ]
    })

    const strategies = ref([
      {
        title: '品牌破局：合纵连横，快速破圈',
        items: [
          {
            type: '借',
            content: '联合WayToAGI，在山东16地市快速举办"AI切磋大会"等线下沙龙'
          },
          {
            type: '借',
            content: '积极承办政府（如大数据局、人社厅、教育厅）主导的AI普及活动'
          }
        ]
      },
      {
        title: '师资破局：外引专家，内建智库',
        items: [
          {
            type: '借',
            content: '建立"海看AI专家库"，签约WayToAGI、东升成、长沙新视界等合作方师资'
          },
          {
            type: '建',
            content: '培养海看"内部认证讲师"，确保核心技术的可控'
          }
        ]
      },
      {
        title: '课程破局：引进与自研并行',
        items: [
          {
            type: '借',
            content: '快速引进长沙新视界（智能体）、东升成（GEO）等合作伙伴的成熟课程体系'
          },
          {
            type: '铸',
            content: '打造《海看AI通识课》和"独家实战课程"，建立"技术+课程"双重护城河'
          }
        ]
      }
    ])

    const getStrategyTagClass = (type) => {
      const classMap = {
        '借': 'borrow-tag',
        '建': 'build-tag',
        '铸': 'forge-tag'
      }
      return classMap[type] || ''
    }

    return {
      swotData,
      strategies,
      getStrategyTagClass
    }
  }
}
</script>

<style scoped>
.swot-table {
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
  margin: 0 0 24px 0;
  text-align: center;
}

.swot-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
  margin-bottom: 32px;
}

.swot-card {
  background: white;
  border: 1px solid #e5e7eb;
  border-radius: 12px;
  overflow: hidden;
  transition: all 0.3s ease;
}

.swot-card:hover {
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
  transform: translateY(-4px);
}

.card-header {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 16px 20px;
  background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%);
  border-bottom: 1px solid #e5e7eb;
}

.card-icon {
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
  font-size: 20px;
  color: white;
}

.strengths .card-icon {
  background: linear-gradient(135deg, #10b981 0%, #059669 100%);
}

.weaknesses .card-icon {
  background: linear-gradient(135deg, #f59e0b 0%, #d97706 100%);
}

.opportunities .card-icon {
  background: linear-gradient(135deg, #3b82f6 0%, #2563eb 100%);
}

.threats .card-icon {
  background: linear-gradient(135deg, #ef4444 0%, #dc2626 100%);
}

.card-header h4 {
  margin: 0;
  font-size: 16px;
  font-weight: 600;
  color: #1f2937;
}

.card-content {
  padding: 20px;
}

.swot-item {
  display: flex;
  align-items: flex-start;
  gap: 8px;
  margin-bottom: 12px;
  font-size: 14px;
  color: #374151;
  line-height: 1.5;
}

.swot-item:last-child {
  margin-bottom: 0;
}

.item-icon {
  font-size: 16px;
  flex-shrink: 0;
  margin-top: 2px;
}

.strengths .item-icon {
  color: #10b981;
}

.weaknesses .item-icon {
  color: #f59e0b;
}

.opportunities .item-icon {
  color: #3b82f6;
}

.threats .item-icon {
  color: #ef4444;
}

.strategy-section {
  margin-top: 32px;
}

.strategy-title {
  font-size: 18px;
  font-weight: 600;
  color: #1f2937;
  margin: 0 0 20px 0;
  text-align: center;
  border-bottom: 2px solid #e5e7eb;
  padding-bottom: 8px;
}

.strategy-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 20px;
}

.strategy-card {
  background: #f8fafc;
  border: 1px solid #e2e8f0;
  border-radius: 12px;
  padding: 20px;
  transition: all 0.3s ease;
}

.strategy-card:hover {
  background: white;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.strategy-header {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 16px;
}

.strategy-number {
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #1e3a8a;
  color: white;
  border-radius: 50%;
  font-weight: 600;
  font-size: 14px;
}

.strategy-header h5 {
  margin: 0;
  font-size: 16px;
  font-weight: 600;
  color: #1f2937;
  flex: 1;
}

.strategy-item {
  display: flex;
  align-items: flex-start;
  gap: 8px;
  margin-bottom: 12px;
  font-size: 14px;
  line-height: 1.5;
}

.strategy-item:last-child {
  margin-bottom: 0;
}

.strategy-tag {
  padding: 2px 8px;
  border-radius: 12px;
  font-size: 12px;
  font-weight: 500;
  flex-shrink: 0;
  margin-top: 2px;
}

.borrow-tag {
  background: #dbeafe;
  color: #1e40af;
}

.build-tag {
  background: #d1fae5;
  color: #065f46;
}

.forge-tag {
  background: #fef3c7;
  color: #92400e;
}

.strategy-text {
  flex: 1;
  color: #374151;
}

@media (max-width: 768px) {
  .swot-grid {
    grid-template-columns: 1fr;
  }
  
  .strategy-grid {
    grid-template-columns: 1fr;
  }
  
  .card-header {
    padding: 12px 16px;
  }
  
  .card-content {
    padding: 16px;
  }
  
  .strategy-card {
    padding: 16px;
  }
}
</style>