<template>
  <div class="summary-view">
    <!-- 页面标题 -->
    <section class="page-header">
      <div class="header-content">
        <h1 class="page-title">
          <span class="title-icon">📋</span>
          总结与建议
        </h1>
        <p class="page-subtitle">
          海看AI培训战略汇报总结
        </p>
        <p class="page-description">
          基于对市场环境、资源禀赋、竞争格局的深入分析，提出海看AI培训业务发展的系统性建议
        </p>
        <div class="page-meta">
          <span class="line-info">{{ lineRange[0] }}-{{ lineRange[1] }}行</span>
          <span class="reading-time">约{{ readingTime }}分钟阅读</span>
        </div>
      </div>
    </section>

    <!-- 核心结论 -->
    <section class="conclusion-section">
      <h2 class="section-title">
        <span class="title-icon">💡</span>
        核心结论：AI培训是海看的战略机遇
      </h2>
      
      <div class="conclusion-highlight">
        <div class="highlight-icon">🎯</div>
        <div class="highlight-content">
          <h3>AI落地的"最后一公里"，卡在了"人"上</h3>
          <p>培训，是解决AI落地'最后一公里'的最佳路径，这正是海看的机遇所在</p>
        </div>
      </div>

      <div class="conclusion-grid">
        <div class="conclusion-card">
          <div class="card-icon">🌊</div>
          <h4>顺势而为</h4>
          <p>AI培训符合政策导向、市场需求、技术成熟度三重要素，是顺势而为的战略选择</p>
        </div>

        <div class="conclusion-card">
          <div class="card-icon">🎯</div>
          <h4>精准定位</h4>
          <p>以"培训+"为核心，构建"培训+咨询+工具+平台"的完整业务生态体系</p>
        </div>

        <div class="conclusion-card">
          <div class="card-icon">🛠️</div>
          <h4>务实路径</h4>
          <p>"借外脑、铸内功"相结合，快速补齐短板，建立长期竞争优势</p>
        </div>

        <div class="conclusion-card">
          <div class="card-icon">🚀</div>
          <h4>可期未来</h4>
          <p>成为山东AI人才基础设施的核心承载者，实现业务的可持续发展</p>
        </div>
      </div>
    </section>

    <!-- 三大关键建议 -->
    <section class="recommendations-section">
      <h2 class="section-title">
        <span class="title-icon">🔑</span>
        三大关键建议
      </h2>
      
      <div class="recommendations-grid">
        <!-- 建议1 -->
        <div class="recommendation-card urgent">
          <div class="recommendation-header">
            <div class="recommendation-number">01</div>
            <div class="recommendation-icon">⚡</div>
            <h3>快速启动，抢占窗口</h3>
            <div class="urgency-badge">紧迫</div>
          </div>
          <div class="recommendation-content">
            <div class="recommendation-points">
              <div class="point-item">
                <span class="point-icon">🎯</span>
                <div class="point-text">
                  <strong>时间窗口：</strong>政策红利期只有12-18个月，必须快速行动
                </div>
              </div>
              <div class="point-item">
                <span class="point-icon">🚀</span>
                <div class="point-text">
                  <strong>首要任务：</strong>3个月内完成团队组建、课程引进、试点项目落地
                </div>
              </div>
              <div class="point-item">
                <span class="point-icon">💰</span>
                <div class="point-text">
                  <strong>资源投入：</strong>确保充足的资源支持，用于团队建设、课程引进、市场推广
                </div>
              </div>
            </div>
            <div class="expected-result">
              <div class="result-label">预期效果</div>
              <div class="result-text">6个月内建立市场认知，实现初期营收目标</div>
            </div>
          </div>
        </div>

        <!-- 建议2 -->
        <div class="recommendation-card strategic">
          <div class="recommendation-header">
            <div class="recommendation-number">02</div>
            <div class="recommendation-icon">🤝</div>
            <h3>开放合作，生态共赢</h3>
            <div class="strategic-badge">战略</div>
          </div>
          <div class="recommendation-content">
            <div class="recommendation-points">
              <div class="point-item">
                <span class="point-icon">🌐</span>
                <div class="point-text">
                  <strong>合作理念：</strong>"不造轮子，链接资源"，与合作伙伴共建生态
                </div>
              </div>
              <div class="point-item">
                <span class="point-icon">🏛️</span>
                <div class="point-text">
                  <strong>政府合作：</strong>积极承办政府AI普及活动，获得政策和资源支持
                </div>
              </div>
              <div class="point-item">
                <span class="point-icon">🎓</span>
                <div class="point-text">
                  <strong>企业合作：</strong>与WayToAGI、东升成、长沙新视界等建立深度合作
                </div>
              </div>
            </div>
            <div class="expected-result">
              <div class="result-label">预期效果</div>
              <div class="result-text">快速建立品牌影响力，降低运营成本</div>
            </div>
          </div>
        </div>

        <!-- 建议3 -->
        <div class="recommendation-card foundation">
          <div class="recommendation-header">
            <div class="recommendation-number">03</div>
            <div class="recommendation-icon">🏗️</div>
            <h3>内功修炼，长期发展</h3>
            <div class="foundation-badge">基础</div>
          </div>
          <div class="recommendation-content">
            <div class="recommendation-points">
              <div class="point-item">
                <span class="point-icon">👥</span>
                <div class="point-text">
                  <strong>人才培养：</strong>建立内部认证讲师体系，确保核心技术可控
                </div>
              </div>
              <div class="point-item">
                <span class="point-icon">📚</span>
                <div class="point-text">
                  <strong>课程研发：</strong>打造《海看AI通识课》和独家实战课程，建立竞争壁垒
                </div>
              </div>
              <div class="point-item">
                <span class="point-icon">🛠️</span>
                <div class="point-text">
                  <strong>技术平台：</strong>建设在线学习平台，支撑规模化运营
                </div>
              </div>
            </div>
            <div class="expected-result">
              <div class="result-label">预期效果</div>
              <div class="result-text">建立可持续的核心竞争力</div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- 实施保障 -->
    <section class="implementation-section">
      <h2 class="section-title">
        <span class="title-icon">🛡️</span>
        实施保障措施
      </h2>
      
      <div class="implementation-grid">
        <div class="implementation-item">
          <div class="item-icon">💰</div>
          <h4>资金保障</h4>
          <p>建立专项资金支持，确保项目顺利推进和可持续发展</p>
        </div>

        <div class="implementation-item">
          <div class="item-icon">👥</div>
          <h4>团队保障</h4>
          <p>组建核心团队，涵盖AI、培训、运营、技术等关键职能</p>
        </div>

        <div class="implementation-item">
          <div class="item-icon">🏛️</div>
          <h4>资源保障</h4>
          <p>充分利用海看国有品牌优势，对接政府和广电系统资源</p>
        </div>

        <div class="implementation-item">
          <div class="item-icon">📊</div>
          <h4>管控保障</h4>
          <p>建立项目管控机制，设定里程碑节点，定期评估和调整策略</p>
        </div>
      </div>
    </section>

    <!-- 成功标准 -->
    <section class="success-metrics-section">
      <h2 class="section-title">
        <span class="title-icon">📈</span>
        成功标准与里程碑
      </h2>
      
      <div class="metrics-timeline">
        <div class="timeline-header">
          <div class="timeline-title">三阶段发展目标</div>
          <div class="timeline-subtitle">可量化、可执行、可评估</div>
        </div>

        <div class="timeline-phases">
          <div class="phase-block phase-1">
            <div class="phase-indicator">
              <div class="phase-dot"></div>
              <div class="phase-line"></div>
            </div>
            <div class="phase-content">
              <h4>启动期（1-3个月）</h4>
              <div class="phase-metrics">
                <div class="metric-item">
                  <span class="metric-label">团队建设</span>
                  <span class="metric-value">核心团队组建完成</span>
                </div>
                <div class="metric-item">
                  <span class="metric-label">培训服务</span>
                  <span class="metric-value">完成初期培训项目</span>
                </div>
                <div class="metric-item">
                  <span class="metric-label">市场开拓</span>
                  <span class="metric-value">建立初步市场认知</span>
                </div>
              </div>
            </div>
          </div>

          <div class="phase-block phase-2">
            <div class="phase-indicator">
              <div class="phase-dot"></div>
              <div class="phase-line"></div>
            </div>
            <div class="phase-content">
              <h4>成长期（4-9个月）</h4>
              <div class="phase-metrics">
                <div class="metric-item">
                  <span class="metric-label">市场拓展</span>
                  <span class="metric-value">扩大培训覆盖范围</span>
                </div>
                <div class="metric-item">
                  <span class="metric-label">客户发展</span>
                  <span class="metric-value">建立稳定客户关系</span>
                </div>
                <div class="metric-item">
                  <span class="metric-label">业务增长</span>
                  <span class="metric-value">实现业务规模提升</span>
                </div>
              </div>
            </div>
          </div>

          <div class="phase-block phase-3">
            <div class="phase-indicator">
              <div class="phase-dot"></div>
            </div>
            <div class="phase-content">
              <h4>成熟期（10-18个月）</h4>
              <div class="phase-metrics">
                <div class="metric-item">
                  <span class="metric-label">业务规模</span>
                  <span class="metric-value">实现规模化运营</span>
                </div>
                <div class="metric-item">
                  <span class="metric-label">市场地位</span>
                  <span class="metric-value">建立行业领先地位</span>
                </div>
                <div class="metric-item">
                  <span class="metric-label">生态构建</span>
                  <span class="metric-value">完成生态闭环建设</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- 风险提醒 -->
    <section class="risk-section">
      <h2 class="section-title">
        <span class="title-icon">⚠️</span>
        风险提醒与应对
      </h2>
      
      <div class="risk-alert">
        <div class="alert-header">
          <div class="alert-icon">🚨</div>
          <h4>关键风险识别</h4>
        </div>
        
        <div class="risk-items">
          <div class="risk-item high-risk">
            <div class="risk-badge">高风险</div>
            <div class="risk-content">
              <h5>技术迭代风险</h5>
              <p>AI技术更新速度快，培训内容容易过时，需要建立持续更新机制</p>
            </div>
          </div>

          <div class="risk-item medium-risk">
            <div class="risk-badge">中风险</div>
            <div class="risk-content">
              <h5>人才流失风险</h5>
              <p>核心人才市场竞争激烈，需要完善激励机制和培养体系</p>
            </div>
          </div>

          <div class="risk-item medium-risk">
            <div class="risk-badge">中风险</div>
            <div class="risk-content">
              <h5>竞争加剧风险</h5>
              <p>市场进入者增多，需要快速建立差异化优势和品牌壁垒</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- 行动号召 -->
    <section class="action-section">
      <h2 class="section-title">
        <span class="title-icon">🚀</span>
        立即行动，抓住机遇
      </h2>
      
      <div class="action-banner">
        <div class="banner-content">
          <h3>AI培训的黄金窗口期稍纵即逝</h3>
          <p>
            面对千载难逢的政策红利、市场需求、技术成熟三重利好叠加，
            海看必须果断行动，以"培训+"战略为抓手，快速切入AI培训市场，
            实现业务的跨越式发展和可持续发展。
          </p>
          
          <div class="action-steps">
            <div class="step-item">
              <div class="step-number">1</div>
              <div class="step-text">立即决策，启动项目</div>
            </div>
            <div class="step-item">
              <div class="step-number">2</div>
              <div class="step-text">组建团队，快速落地</div>
            </div>
            <div class="step-item">
              <div class="step-number">3</div>
              <div class="step-text">生态合作，共建共赢</div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- 快速导航 -->
    <section class="navigation-section">
      <div class="nav-buttons">
        <button class="nav-btn prev-btn" @click="goToPrev">
          <span class="btn-icon">←</span>
          <span class="btn-text">如何做</span>
        </button>
        <button class="nav-btn home-btn" @click="goHome">
          <span class="btn-icon">🏠</span>
          <span class="btn-text">首页</span>
        </button>
        <button class="nav-btn complete-btn" @click="markCompleted">
          <span class="btn-icon">✅</span>
          <span class="btn-text">完成阅读</span>
        </button>
      </div>
    </section>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useAppStore } from '@/stores/app'

export default {
  name: 'Summary',
  setup() {
    const router = useRouter()
    const appStore = useAppStore()
    
    // 页面数据
    const lineRange = [99, 110] // 对应稿件.md行数
    const readingTime = 8 // 预估阅读时间
    
    // 导航方法
    const goToPrev = () => {
      router.push('/how')
    }
    
    const goHome = () => {
      router.push('/')
    }
    
    const markCompleted = () => {
      appStore.markReadingCompleted()
      // 显示完成提示
      alert('恭喜！您已完成海看AI培训战略汇报的完整阅读')
      router.push('/')
    }
    
    // 页面初始化
    onMounted(() => {
      appStore.setCurrentSection('summary')
      // 更新阅读进度
      appStore.updateReadingProgress(lineRange[0], lineRange[1])
    })
    
    return {
      lineRange,
      readingTime,
      goToPrev,
      goHome,
      markCompleted
    }
  }
}
</script>

<style scoped>
.summary-view {
  max-width: 1200px;
  margin: 0 auto;
  padding: 40px 20px;
}

/* 页面标题 */
.page-header {
  text-align: center;
  margin-bottom: 48px;
  padding: 48px 0;
  background: linear-gradient(135deg, #ea580c 0%, #dc2626 100%);
  border-radius: 16px;
  color: white;
}

.header-content {
  max-width: 800px;
  margin: 0 auto;
  padding: 0 32px;
}

.page-title {
  font-size: 42px;
  font-weight: 700;
  margin: 0 0 16px 0;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 16px;
}

.title-icon {
  font-size: 38px;
}

.page-subtitle {
  font-size: 20px;
  font-weight: 500;
  margin: 0 0 16px 0;
  opacity: 0.9;
}

.page-description {
  font-size: 16px;
  margin: 0 0 24px 0;
  opacity: 0.8;
  line-height: 1.6;
}

.page-meta {
  display: flex;
  justify-content: center;
  gap: 24px;
  font-size: 14px;
  opacity: 0.8;
}

.line-info,
.reading-time {
  padding: 6px 12px;
  background: rgba(255, 255, 255, 0.15);
  border-radius: 20px;
  backdrop-filter: blur(10px);
}

/* 区域标题 */
.section-title {
  font-size: 32px;
  font-weight: 700;
  color: #1f2937;
  margin: 0 0 32px 0;
  display: flex;
  align-items: center;
  gap: 16px;
  text-align: center;
  justify-content: center;
}

/* 核心结论区域 */
.conclusion-section {
  margin-bottom: 48px;
}

.conclusion-highlight {
  display: flex;
  align-items: center;
  gap: 24px;
  padding: 32px;
  background: linear-gradient(135deg, #fef3c7 0%, #fde68a 100%);
  border: 2px solid #f59e0b;
  border-radius: 16px;
  margin-bottom: 32px;
}

.highlight-icon {
  font-size: 64px;
  flex-shrink: 0;
}

.highlight-content h3 {
  font-size: 24px;
  font-weight: 600;
  color: #92400e;
  margin: 0 0 12px 0;
}

.highlight-content p {
  font-size: 18px;
  color: #78350f;
  margin: 0;
  line-height: 1.6;
}

.conclusion-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 24px;
}

.conclusion-card {
  background: white;
  border-radius: 12px;
  padding: 24px;
  border: 1px solid #e5e7eb;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  transition: all 0.3s ease;
  text-align: center;
}

.conclusion-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
}

.card-icon {
  font-size: 48px;
  margin-bottom: 16px;
}

.conclusion-card h4 {
  font-size: 18px;
  font-weight: 600;
  color: #1f2937;
  margin: 0 0 12px 0;
}

.conclusion-card p {
  font-size: 14px;
  color: #6b7280;
  margin: 0;
  line-height: 1.5;
}

/* 关键建议区域 */
.recommendations-section {
  margin-bottom: 48px;
}

.recommendations-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 24px;
}

.recommendation-card {
  background: white;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  border-top: 4px solid;
}

.recommendation-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
}

.recommendation-card.urgent {
  border-top-color: #dc2626;
}

.recommendation-card.strategic {
  border-top-color: #3b82f6;
}

.recommendation-card.foundation {
  border-top-color: #10b981;
}

.recommendation-header {
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 20px 24px;
  background: #f8fafc;
  border-bottom: 1px solid #e5e7eb;
  position: relative;
}

.recommendation-number {
  width: 40px;
  height: 40px;
  background: #1f2937;
  color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;
  font-weight: 600;
  flex-shrink: 0;
}

.recommendation-icon {
  font-size: 32px;
  flex-shrink: 0;
}

.urgent .recommendation-icon {
  color: #dc2626;
}

.strategic .recommendation-icon {
  color: #3b82f6;
}

.foundation .recommendation-icon {
  color: #10b981;
}

.recommendation-header h3 {
  margin: 0;
  font-size: 18px;
  font-weight: 600;
  color: #1f2937;
  flex: 1;
}

.urgency-badge,
.strategic-badge,
.foundation-badge {
  position: absolute;
  top: 12px;
  right: 12px;
  padding: 4px 8px;
  border-radius: 12px;
  font-size: 12px;
  font-weight: 600;
}

.urgency-badge {
  background: #fee2e2;
  color: #991b1b;
}

.strategic-badge {
  background: #dbeafe;
  color: #1e40af;
}

.foundation-badge {
  background: #d1fae5;
  color: #065f46;
}

.recommendation-content {
  padding: 24px;
}

.recommendation-points {
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin-bottom: 20px;
}

.point-item {
  display: flex;
  align-items: flex-start;
  gap: 12px;
}

.point-icon {
  font-size: 20px;
  flex-shrink: 0;
  margin-top: 2px;
}

.point-text {
  font-size: 14px;
  color: #374151;
  line-height: 1.5;
  flex: 1;
}

.point-text strong {
  color: #1f2937;
}

.expected-result {
  padding: 16px;
  background: #f0f9ff;
  border-radius: 8px;
  border: 1px solid #bae6fd;
  text-align: center;
}

.result-label {
  font-size: 12px;
  color: #6b7280;
  margin-bottom: 4px;
}

.result-text {
  font-size: 14px;
  font-weight: 500;
  color: #1e40af;
}

/* 实施保障区域 */
.implementation-section {
  margin-bottom: 48px;
}

.implementation-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 24px;
}

.implementation-item {
  background: white;
  border-radius: 12px;
  padding: 24px;
  border: 1px solid #e5e7eb;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  transition: all 0.3s ease;
  text-align: center;
}

.implementation-item:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
}

.item-icon {
  font-size: 48px;
  margin-bottom: 16px;
}

.implementation-item h4 {
  font-size: 18px;
  font-weight: 600;
  color: #1f2937;
  margin: 0 0 12px 0;
}

.implementation-item p {
  font-size: 14px;
  color: #6b7280;
  margin: 0;
  line-height: 1.5;
}

/* 成功标准区域 */
.success-metrics-section {
  margin-bottom: 48px;
}

.metrics-timeline {
  background: white;
  border-radius: 16px;
  padding: 32px;
  border: 1px solid #e5e7eb;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
}

.timeline-header {
  text-align: center;
  margin-bottom: 32px;
}

.timeline-title {
  font-size: 24px;
  font-weight: 600;
  color: #1f2937;
  margin: 0 0 8px 0;
}

.timeline-subtitle {
  font-size: 16px;
  color: #6b7280;
  margin: 0;
}

.timeline-phases {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.phase-block {
  display: flex;
  align-items: flex-start;
  gap: 20px;
}

.phase-indicator {
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
}

.phase-dot {
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background: #1f2937;
  margin-bottom: 8px;
}

.phase-1 .phase-dot {
  background: #dc2626;
}

.phase-2 .phase-dot {
  background: #f59e0b;
}

.phase-3 .phase-dot {
  background: #10b981;
}

.phase-line {
  width: 2px;
  height: 60px;
  background: #e5e7eb;
}

.phase-content {
  flex: 1;
  background: #f8fafc;
  border-radius: 12px;
  padding: 20px;
}

.phase-content h4 {
  font-size: 18px;
  font-weight: 600;
  color: #1f2937;
  margin: 0 0 16px 0;
}

.phase-metrics {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.metric-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 12px;
  background: white;
  border-radius: 6px;
  border: 1px solid #e5e7eb;
}

.metric-label {
  font-size: 14px;
  color: #6b7280;
}

.metric-value {
  font-size: 14px;
  font-weight: 600;
  color: #1f2937;
}

/* 风险提醒区域 */
.risk-section {
  margin-bottom: 48px;
}

.risk-alert {
  background: #fef2f2;
  border-radius: 16px;
  padding: 32px;
  border: 2px solid #fca5a5;
}

.alert-header {
  display: flex;
  align-items: center;
  gap: 16px;
  margin-bottom: 24px;
  padding-bottom: 16px;
  border-bottom: 1px solid #fecaca;
}

.alert-icon {
  font-size: 32px;
}

.alert-header h4 {
  font-size: 20px;
  font-weight: 600;
  color: #991b1b;
  margin: 0;
}

.risk-items {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.risk-item {
  display: flex;
  align-items: flex-start;
  gap: 16px;
  padding: 20px;
  background: white;
  border-radius: 12px;
  border: 1px solid #fecaca;
}

.risk-badge {
  padding: 4px 12px;
  border-radius: 20px;
  font-size: 12px;
  font-weight: 600;
  flex-shrink: 0;
  margin-top: 2px;
}

.high-risk .risk-badge {
  background: #fee2e2;
  color: #991b1b;
}

.medium-risk .risk-badge {
  background: #fef3c7;
  color: #92400e;
}

.risk-content h5 {
  font-size: 16px;
  font-weight: 600;
  color: #1f2937;
  margin: 0 0 8px 0;
}

.risk-content p {
  font-size: 14px;
  color: #6b7280;
  margin: 0;
  line-height: 1.5;
}

/* 行动号召区域 */
.action-section {
  margin-bottom: 48px;
}

.action-banner {
  background: linear-gradient(135deg, #1e3a8a 0%, #1e40af 100%);
  border-radius: 16px;
  padding: 48px 32px;
  text-align: center;
  color: white;
}

.banner-content h3 {
  font-size: 28px;
  font-weight: 700;
  margin: 0 0 20px 0;
}

.banner-content p {
  font-size: 16px;
  line-height: 1.7;
  margin: 0 0 32px 0;
  opacity: 0.9;
  max-width: 800px;
  margin-left: auto;
  margin-right: auto;
}

.action-steps {
  display: flex;
  justify-content: center;
  gap: 32px;
  flex-wrap: wrap;
}

.step-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
}

.step-number {
  width: 40px;
  height: 40px;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;
  font-weight: 600;
}

.step-text {
  font-size: 14px;
  font-weight: 500;
}

/* 导航按钮 */
.navigation-section {
  margin-top: 48px;
}

.nav-buttons {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 16px;
  flex-wrap: wrap;
}

.nav-btn {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 12px 24px;
  border: none;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
  text-decoration: none;
}

.prev-btn {
  background: #f3f4f6;
  color: #374151;
}

.prev-btn:hover {
  background: #e5e7eb;
}

.home-btn {
  background: #1e3a8a;
  color: white;
}

.home-btn:hover {
  background: #1e40af;
}

.complete-btn {
  background: #10b981;
  color: white;
}

.complete-btn:hover {
  background: #059669;
}

.btn-icon {
  font-size: 16px;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .summary-view {
    padding: 20px 16px;
  }
  
  .page-header {
    padding: 32px 24px;
    margin-bottom: 32px;
  }
  
  .header-content {
    padding: 0 16px;
  }
  
  .page-title {
    font-size: 32px;
  }
  
  .page-subtitle {
    font-size: 18px;
  }
  
  .page-meta {
    flex-direction: column;
    gap: 12px;
  }
  
  .conclusion-highlight {
    flex-direction: column;
    text-align: center;
    gap: 16px;
  }
  
  .highlight-icon {
    font-size: 48px;
  }
  
  .conclusion-grid,
  .recommendations-grid,
  .implementation-grid {
    grid-template-columns: 1fr;
    gap: 20px;
  }
  
  .recommendation-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 12px;
  }
  
  .phase-block {
    flex-direction: column;
    align-items: center;
    gap: 16px;
  }
  
  .phase-indicator {
    flex-direction: row;
    gap: 12px;
  }
  
  .phase-line {
    width: 60px;
    height: 2px;
  }
  
  .action-steps {
    flex-direction: column;
    gap: 16px;
  }
  
  .nav-buttons {
    flex-direction: column;
    width: 100%;
  }
  
  .nav-btn {
    width: 100%;
    justify-content: center;
  }
}
</style>