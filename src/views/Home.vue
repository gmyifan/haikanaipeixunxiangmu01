<template>
  <div class="home-view">
    <!-- 战略定位横幅 -->
    <section class="strategy-hero-section">
      <div class="strategy-content">
        <div class="strategy-header">
          <h1 class="strategy-title">
            <span class="title-icon">🎯</span>
            海看AI培训：构建海看"技术+内容+场景"新生态的工作汇报
          </h1>
          <p class="strategy-subtitle">战略定位：以AI培训为起点，构建AI业务生态</p>
          <p class="strategy-position">根据公司《人工智能应用创新发展纲要》，海看的目标是全面推行"人工智能+"，实现全业务的AI化赋能。</p>
        </div>
        
        <div class="strategy-stats">
          <div class="stat-card">
            <div class="stat-number">110</div>
            <div class="stat-label">核心战略要点</div>
          </div>
          <div class="stat-card">
            <div class="stat-number">5</div>
            <div class="stat-label">发展阶段</div>
          </div>
          <div class="stat-card">
            <div class="stat-number">4</div>
            <div class="stat-label">盈利模式</div>
          </div>
        </div>
      </div>
    </section>

    <!-- 核心战略内容 -->
    <section class="core-strategy-section">
      <h2 class="section-title">
        <span class="title-icon">🚀</span>
        核心战略路径
      </h2>
      
      <div class="strategy-grid">
        <div class="strategy-card">
          <div class="strategy-icon">🎯</div>
          <h3>战略定位</h3>
          <p>海看AI培训业务的核心定位和目标市场</p>
          <div class="strategy-detail">
            <span class="highlight">技术+内容+场景</span>
            <span class="highlight">培训+咨询+工具+平台</span>
          </div>
        </div>
        
        <div class="strategy-card">
          <div class="strategy-icon">🌊</div>
          <h3>时代机遇</h3>
          <p>政策红利与市场需求的双重驱动</p>
          <div class="strategy-detail">
            <span class="highlight">政策驱动</span>
            <span class="highlight">市场痛点</span>
          </div>
        </div>
        
        <div class="strategy-card">
          <div class="strategy-icon">🤝</div>
          <h3>生态合作</h3>
          <p>链接资源，借外脑+铸内功</p>
          <div class="strategy-detail">
            <span class="highlight">不造轮子</span>
            <span class="highlight">合作共赢</span>
          </div>
        </div>
      </div>
    </section>

    <!-- 政策基础 -->
    <section class="policy-section">
      <h2 class="section-title">
        <span class="title-icon">📋</span>
        政策基础
      </h2>
      
      <div class="policy-content">
        <div class="policy-card">
          <div class="policy-header">
            <h3>国家层面</h3>
          </div>
          <p class="policy-text">国务院发布《关于深入实施"人工智能+"行动的意见》，明确提出"大力支持开展人工智能技能培训"</p>
        </div>
        
        <div class="policy-card">
          <div class="policy-header">
            <h3>省级层面</h3>
          </div>
          <p class="policy-text">山东省委书记林武将人工智能创新应用作为"一把手"工程，要求各级政府强力推动</p>
        </div>
      </div>
    </section>

    <!-- 导航卡片 -->
    <section class="navigation-section">
      <h2 class="section-title">
        <span class="title-icon">📚</span>
        内容导航
      </h2>
      
      <div class="nav-cards">
        <router-link to="/why" class="nav-card card-why">
          <div class="card-icon">🔍</div>
          <div class="card-content">
            <h3 class="card-title">WHY：为什么做？</h3>
            <p class="card-subtitle">时代浪潮与市场痛点</p>
            <div class="card-meta">
              <span>9-30行</span>
              <span>约5分钟</span>
            </div>
          </div>
          <div class="card-arrow">
            <el-icon><ArrowRight /></el-icon>
          </div>
        </router-link>
        
        <router-link to="/what" class="nav-card card-what">
          <div class="card-icon">🎯</div>
          <div class="card-content">
            <h3 class="card-title">WHAT：做什么？</h3>
            <p class="card-subtitle">核心定位、生态合作与盈利模式</p>
            <div class="card-meta">
              <span>31-78行</span>
              <span>约8分钟</span>
            </div>
          </div>
          <div class="card-arrow">
            <el-icon><ArrowRight /></el-icon>
          </div>
        </router-link>
        
        <router-link to="/how" class="nav-card card-how">
          <div class="card-icon">🛠️</div>
          <div class="card-content">
            <h3 class="card-title">HOW：如何做？</h3>
            <p class="card-subtitle">SWOT分析与执行路径</p>
            <div class="card-meta">
              <span>79-98行</span>
              <span>约5分钟</span>
            </div>
          </div>
          <div class="card-arrow">
            <el-icon><ArrowRight /></el-icon>
          </div>
        </router-link>
        
        <router-link to="/summary" class="nav-card card-summary">
          <div class="card-icon">📋</div>
          <div class="card-content">
            <h3 class="card-title">总结建议</h3>
            <p class="card-subtitle">核心要点与行动建议</p>
            <div class="card-meta">
              <span>99-110行</span>
              <span>约3分钟</span>
            </div>
          </div>
          <div class="card-arrow">
            <el-icon><ArrowRight /></el-icon>
          </div>
        </router-link>
      </div>
    </section>

    <!-- 快速操作 -->
    <section class="actions-section">
      <h2 class="section-title">
        <span class="title-icon">🚀</span>
        快速操作
      </h2>
      
      <div class="action-cards">
        <div class="action-card" @click="startReading">
          <div class="action-icon">📖</div>
          <h4>开始阅读</h4>
          <p>从WHY开始，按顺序阅读完整内容</p>
        </div>
        
        <div class="action-card" @click="viewFullContent">
          <div class="action-icon">📄</div>
          <h4>完整内容</h4>
          <p>查看110行原文的完整列表</p>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useAppStore } from '@/stores/app'
import { ArrowRight } from '@element-plus/icons-vue'

export default {
  name: 'Home',
  components: {
    ArrowRight
  },
  setup() {
    const router = useRouter()
    const appStore = useAppStore()
    
    // 计算属性 - 从store获取总行数，而不是硬编码
    const totalLines = computed(() => appStore.totalLines)

    // 开始阅读
    const startReading = () => {
      router.push('/why')
    }

    // 查看完整内容
    const viewFullContent = () => {
      router.push('/full-content')
    }

    // 页面初始化
    onMounted(() => {
      appStore.setCurrentSection('home')
    })

    return {
      totalLines,
      startReading,
      viewFullContent
    }
  }
}
</script>

<style scoped>
.home-view {
  max-width: 1200px;
  margin: 0 auto;
  padding: 40px 20px;
}

/* 通用标题样式 */
.section-title {
  font-size: 28px;
  font-weight: 700;
  color: #1f2937;
  margin: 0 0 32px 0;
  display: flex;
  align-items: center;
  gap: 12px;
}

.title-icon {
  font-size: 32px;
}

/* 战略定位横幅 */
.strategy-hero-section {
  background: linear-gradient(135deg, #1e3a8a 0%, #1e40af 100%);
  border-radius: 16px;
  padding: 48px;
  margin-bottom: 64px;
  color: white;
  position: relative;
  overflow: hidden;
}

.strategy-hero-section::before {
  content: '';
  position: absolute;
  top: -50%;
  right: -10%;
  width: 400px;
  height: 400px;
  background: radial-gradient(circle, rgba(255,255,255,0.1) 0%, transparent 70%);
  border-radius: 50%;
}

.strategy-content {
  position: relative;
  z-index: 1;
}

.strategy-header {
  text-align: center;
  margin-bottom: 32px;
}

.strategy-title {
  font-size: 42px;
  font-weight: 700;
  margin: 0 0 16px 0;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 16px;
}

.strategy-title .title-icon {
  font-size: 38px;
}

.strategy-subtitle {
  font-size: 20px;
  font-weight: 500;
  margin: 0 0 12px 0;
  opacity: 0.9;
}

.strategy-position {
  font-size: 18px;
  font-weight: 600;
  margin: 0;
  padding: 12px 24px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 8px;
  display: inline-block;
}

.strategy-stats {
  display: flex;
  justify-content: center;
  gap: 24px;
}

.stat-card {
  background: rgba(255, 255, 255, 0.15);
  backdrop-filter: blur(10px);
  padding: 24px;
  border-radius: 12px;
  text-align: center;
  min-width: 140px;
  border: 1px solid rgba(255, 255, 255, 0.2);
}

.stat-number {
  font-size: 36px;
  font-weight: 700;
  margin-bottom: 8px;
}

.stat-label {
  font-size: 14px;
  opacity: 0.9;
}

/* 核心战略内容 */
.core-strategy-section {
  margin-bottom: 64px;
}

.strategy-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 24px;
}

.strategy-card {
  background: white;
  border-radius: 12px;
  padding: 32px;
  border: 1px solid #e5e7eb;
  transition: all 0.3s ease;
  text-align: center;
}

.strategy-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 12px 24px rgba(0, 0, 0, 0.15);
  border-color: #1e3a8a;
}

.strategy-icon {
  font-size: 48px;
  margin-bottom: 20px;
}

.strategy-card h3 {
  font-size: 20px;
  font-weight: 600;
  margin: 0 0 12px 0;
  color: #1f2937;
}

.strategy-card p {
  font-size: 16px;
  line-height: 1.6;
  color: #374151;
  margin: 0 0 16px 0;
}

.strategy-detail {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.highlight {
  padding: 4px 8px;
  background: #fef3c7;
  color: #92400e;
  border-radius: 4px;
  font-size: 14px;
  font-weight: 500;
}

/* 政策基础 */
.policy-section {
  margin-bottom: 64px;
}

.policy-content {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
  gap: 24px;
}

.policy-card {
  background: #f8fafc;
  border: 1px solid #e2e8f0;
  border-radius: 12px;
  padding: 24px;
}

.policy-header {
  margin-bottom: 16px;
}

.policy-header h3 {
  margin: 0;
  font-size: 18px;
  font-weight: 600;
  color: #1e3a8a;
}

.policy-text {
  font-size: 15px;
  line-height: 1.6;
  color: #374151;
  margin: 0;
}

/* 导航卡片 */
.navigation-section {
  margin-bottom: 64px;
}

.nav-cards {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 24px;
}

.nav-card {
  background: white;
  border-radius: 12px;
  padding: 32px;
  display: flex;
  align-items: center;
  gap: 20px;
  text-decoration: none;
  color: inherit;
  border: 2px solid transparent;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
}

.nav-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 4px;
  background: var(--card-color, #1e3a8a);
}

.nav-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 12px 24px rgba(0, 0, 0, 0.15);
  border-color: var(--card-color, #1e3a8a);
}

.card-why { --card-color: #059669; }
.card-what { --card-color: #7c3aed; }
.card-how { --card-color: #dc2626; }
.card-summary { --card-color: #ea580c; }

.card-icon {
  font-size: 48px;
  width: 80px;
  height: 80px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #f8fafc;
  border-radius: 12px;
  flex-shrink: 0;
}

.card-content {
  flex: 1;
}

.card-title {
  font-size: 18px;
  font-weight: 600;
  margin: 0 0 8px 0;
  color: #1f2937;
}

.card-subtitle {
  font-size: 14px;
  color: #6b7280;
  margin: 0 0 12px 0;
  line-height: 1.4;
}

.card-meta {
  display: flex;
  gap: 16px;
  font-size: 12px;
  color: #9ca3af;
}

.card-arrow {
  color: #9ca3af;
  font-size: 20px;
  transition: transform 0.2s ease;
}

.nav-card:hover .card-arrow {
  transform: translateX(4px);
}

/* 快速操作 */
.actions-section {
  margin-bottom: 64px;
}

.action-cards {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;
}

.action-card {
  background: white;
  border-radius: 12px;
  padding: 24px;
  text-align: center;
  border: 1px solid #e5e7eb;
  cursor: pointer;
  transition: all 0.3s ease;
}

.action-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
  border-color: #1e3a8a;
}

.action-icon {
  font-size: 36px;
  margin-bottom: 16px;
}

.action-card h4 {
  font-size: 16px;
  font-weight: 600;
  margin: 0 0 8px 0;
  color: #1f2937;
}

.action-card p {
  font-size: 13px;
  line-height: 1.5;
  color: #6b7280;
  margin: 0;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .home-view {
    padding: 20px 16px;
  }
  
  .section-title {
    font-size: 24px;
    margin-bottom: 24px;
  }
  
  .strategy-hero-section {
    padding: 32px 24px;
    margin-bottom: 48px;
  }
  
  .strategy-title {
    font-size: 32px;
  }
  
  .strategy-subtitle {
    font-size: 18px;
  }
  
  .strategy-stats {
    flex-direction: column;
    gap: 16px;
  }
  
  .stat-card {
    min-width: auto;
  }
  
  .strategy-grid,
  .nav-cards,
  .action-cards {
    grid-template-columns: 1fr;
    gap: 16px;
  }
  
  .strategy-card,
  .nav-card {
    padding: 24px;
  }
  
  .card-icon {
    width: 60px;
    height: 60px;
    font-size: 36px;
  }
}

@media (max-width: 480px) {
  .strategy-title {
    font-size: 28px;
  }
  
  .strategy-subtitle {
    font-size: 16px;
  }
  
  .nav-card {
    flex-direction: column;
    text-align: center;
    gap: 16px;
  }
  
  .card-meta {
    justify-content: center;
  }
}
</style>