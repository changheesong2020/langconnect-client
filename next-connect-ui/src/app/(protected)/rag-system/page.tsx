'use client'

import { useEffect } from 'react'
import Script from 'next/script'
import Head from 'next/head'

export default function RagSystemPage() {
  useEffect(() => {
    const initCharts = () => {
      const brilliantBlues = {
        deep: '#004AAD',
        bright: '#0079E4',
        light: '#6EC1E4',
        text: '#333333',
        background: '#F2F2F2',
      }

      const wrapLabel = (label: string, maxLength = 16) => {
        if (label.length <= maxLength) {
          return label
        }
        const words = label.split(' ')
        const lines: string[] = []
        let currentLine = ''
        for (const word of words) {
          if ((currentLine + word).length > maxLength) {
            lines.push(currentLine.trim())
            currentLine = ''
          }
          currentLine += word + ' '
        }
        lines.push(currentLine.trim())
        return lines
      }

      const multiLineTooltipTitle = {
        plugins: {
          tooltip: {
            callbacks: {
              title: function (tooltipItems: any) {
                const item = tooltipItems[0]
                const label = item.chart.data.labels[item.dataIndex]
                if (Array.isArray(label)) {
                  return label.join(' ')
                } else {
                  return label
                }
              },
            },
          },
        },
      }

      const chunkCtx = (document.getElementById('chunkCompositionChart') as HTMLCanvasElement | null)?.getContext('2d')
      if (chunkCtx && (window as any).Chart) {
        new (window as any).Chart(chunkCtx, {
          type: 'doughnut',
          data: {
            labels: ['텍스트 내용 (chunk_text)', '벡터 임베딩 (embedding)', '메타데이터 (metadata)'],
            datasets: [
              {
                label: '청크 구성',
                data: [45, 35, 20],
                backgroundColor: [
                  brilliantBlues.deep,
                  brilliantBlues.bright,
                  brilliantBlues.light,
                ],
                borderColor: brilliantBlues.background,
                borderWidth: 4,
              },
            ],
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
              ...multiLineTooltipTitle.plugins,
              legend: {
                position: 'bottom',
              },
              title: {
                display: false,
              },
            },
          },
        })
      }

      const schemaCtx = (document.getElementById('schemaStrategyChart') as HTMLCanvasElement | null)?.getContext('2d')
      if (schemaCtx && (window as any).Chart) {
        new (window as any).Chart(schemaCtx, {
          type: 'bar',
          data: {
            labels: ['단순성', '확장성', '데이터 무결성', '고급 검색(PDR)'].map((label) => wrapLabel(label)),
            datasets: [
              {
                label: '단일 테이블',
                data: [90, 40, 50, 30],
                backgroundColor: brilliantBlues.bright,
                borderRadius: 4,
              },
              {
                label: '다중 테이블 (상위-자식)',
                data: [60, 95, 90, 85],
                backgroundColor: brilliantBlues.deep,
                borderRadius: 4,
              },
            ],
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
              y: {
                beginAtZero: true,
                max: 100,
                grid: {
                  color: '#e0e0e0',
                },
              },
              x: {
                grid: {
                  display: false,
                },
              },
            },
            plugins: {
              ...multiLineTooltipTitle.plugins,
              legend: {
                position: 'bottom',
              },
              title: {
                display: false,
              },
            },
          },
        })
      }
    }

    if ((window as any).Chart) {
      initCharts()
    } else {
      const interval = setInterval(() => {
        if ((window as any).Chart) {
          clearInterval(interval)
          initCharts()
        }
      }, 100)
      return () => clearInterval(interval)
    }
  }, [])

  return (
    <>
      <Head>
        <title>PostgreSQL & pgvector RAG 시스템 인포그래픽</title>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@300;400;500;700;900&display=swap"
          rel="stylesheet"
        />
      </Head>
      <Script src="https://cdn.jsdelivr.net/npm/chart.js"></Script>
      <div
        className="bg-[#F2F2F2] text-[#333333]"
        style={{ fontFamily: '"Noto Sans KR", sans-serif' }}
      >
        <div className="container mx-auto p-4 sm:p-6 lg:p-8 max-w-7xl">
          <header className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-extrabold text-[#004AAD] mb-2">
              PostgreSQL & pgvector로 RAG 시스템 구축하기
            </h1>
            <p className="text-xl text-[#0079E4] font-medium">데이터 아키텍처 시각화 가이드</p>
          </header>

          <main className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <section className="md:col-span-2 bg-white rounded-xl shadow-lg p-6 flex flex-col md:flex-row items-center gap-6 border-l-8 border-[#004AAD]">
              <div className="flex-shrink-0">
                <span className="text-6xl">🧠</span>
              </div>
              <div>
                <h2 className="text-2xl font-bold text-[#004AAD] mb-2">
                  RAG란 무엇인가? LLM의 한계를 극복하는 열쇠
                </h2>
                <p className="text-base">
                  Retrieval-Augmented Generation(RAG)은 대규모 언어 모델(LLM)에 외부 지식 베이스를 동적으로 연결하여, 더 정확하고 최신 정보를 반영한 답변을 생성하는 기술입니다. LLM을 재학습시킬 필요 없이 특정 도메인에 대한 전문성을 부여할 수 있습니다.
                </p>
              </div>
            </section>

            <section className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-2xl font-bold text-[#004AAD] mb-4 text-center">RAG의 핵심 이점</h2>
              <div className="space-y-4">
                <div className="flex items-center gap-4 p-3 bg-blue-50 rounded-lg">
                  <span className="text-3xl">🎯</span>
                  <div>
                    <h3 className="font-semibold">정확성 향상</h3>
                    <p className="text-sm text-gray-600">사실에 기반한 외부 데이터를 참조하여 답변의 신뢰도를 높입니다.</p>
                  </div>
                </div>
                <div className="flex items-center gap-4 p-3 bg-blue-50 rounded-lg">
                  <span className="text-3xl">👻</span>
                  <div>
                    <h3 className="font-semibold">환각(Hallucination) 방지</h3>
                    <p className="text-sm text-gray-600">모델이 잘못된 정보를 생성하는 경향을 크게 줄입니다.</p>
                  </div>
                </div>
                <div className="flex items-center gap-4 p-3 bg-blue-50 rounded-lg">
                  <span className="text-3xl">🔗</span>
                  <div>
                    <h3 className="font-semibold">검증 가능한 답변</h3>
                    <p className="text-sm text-gray-600">답변의 근거가 된 원본 소스를 함께 제시할 수 있습니다.</p>
                  </div>
                </div>
              </div>
            </section>

            <section className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-2xl font-bold text-[#004AAD] mb-4 text-center">왜 PostgreSQL + pgvector인가?</h2>
              <div className="flex flex-col items-center justify-center h-full">
                <div className="text-center mb-4">
                  <span className="text-5xl">🗃️ + 🧬</span>
                  <p className="mt-2 font-bold text-lg text-[#0079E4]">하이브리드 데이터 관리</p>
                </div>
                <p className="text-center text-base">
                  하나의 데이터베이스에서 <strong>관계형 데이터</strong>와 <strong>벡터 데이터</strong>를 함께 저장하고 쿼리할 수 있어 아키텍처가 단순해지고, PostgreSQL의 강력한 기능(ACID, 복제, JOIN)을 그대로 활용할 수 있습니다.
                </p>
              </div>
            </section>

            <section className="md:col-span-2 bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-2xl font-bold text-[#004AAD] mb-6 text-center">RAG 워크플로우</h2>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="p-4 border rounded-lg">
                  <h3 className="text-xl font-semibold text-center mb-4 text-[#0079E4]">
                    1. 인덱싱 단계 (Indexing)
                  </h3>
                  <div className="flex flex-col items-center space-y-2">
                    <div className="p-3 bg-gray-100 rounded-md w-full text-center">데이터 로딩 (PDF, DB 등)</div>
                    <div className="text-[2rem] leading-none text-[#6EC1E4]">↓</div>
                    <div className="p-3 bg-gray-100 rounded-md w-full text-center">텍스트 청킹 (Chunking)</div>
                    <div className="text-[2rem] leading-none text-[#6EC1E4]">↓</div>
                    <div className="p-3 bg-gray-100 rounded-md w-full text-center">임베딩 생성 (Embedding)</div>
                    <div className="text-[2rem] leading-none text-[#6EC1E4]">↓</div>
                    <div className="p-3 bg-[#6EC1E4] text-white font-bold rounded-md w-full text-center">PostgreSQL에 저장</div>
                  </div>
                </div>
                <div className="p-4 border rounded-lg">
                  <h3 className="text-xl font-semibold text-center mb-4 text-[#0079E4]">
                    2. 검색 및 생성 단계 (Retrieval & Generation)
                  </h3>
                  <div className="flex flex-col items-center space-y-2">
                    <div className="p-3 bg-gray-100 rounded-md w-full text-center">사용자 쿼리</div>
                    <div className="text-[2rem] leading-none text-[#6EC1E4]">↓</div>
                    <div className="p-3 bg-gray-100 rounded-md w-full text-center">쿼리 임베딩</div>
                    <div className="text-[2rem] leading-none text-[#6EC1E4]">↓</div>
                    <div className="p-3 bg-gray-100 rounded-md w-full text-center">유사도 검색 (from PG)</div>
                    <div className="text-[2rem] leading-none text-[#6EC1E4]">↓</div>
                    <div className="p-3 bg-gray-100 rounded-md w-full text-center">컨텍스트 증강</div>
                    <div className="text-[2rem] leading-none text-[#6EC1E4]">↓</div>
                    <div className="p-3 bg-[#004AAD] text-white font-bold rounded-md w-full text-center">LLM 답변 생성</div>
                  </div>
                </div>
              </div>
            </section>

            <section className="md:col-span-2 bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-2xl font-bold text-[#004AAD] mb-2 text-center">
                핵심 데이터 구조: `document_chunks` 테이블
              </h2>
              <p className="text-center text-gray-600 mb-6">
                RAG 시스템의 성능은 잘 설계된 데이터 테이블에서 시작됩니다. 청크, 임베딩, 메타데이터를 통합 관리하는 것이 핵심입니다.
              </p>
              <div className="overflow-x-auto">
                <div className="bg-slate-800 text-white p-4 rounded-lg font-mono text-sm min-w-[700px]">
                  <div className="grid grid-cols-4 gap-4 font-bold border-b border-slate-600 pb-2 mb-2">
                    <div>Column</div>
                    <div>Type</div>
                    <div>Description</div>
                    <div>Example</div>
                  </div>
                  <div className="grid grid-cols-4 gap-4 items-center py-2 border-b border-slate-700">
                    <div>id</div>
                    <div className="text-purple-400">BIGSERIAL</div>
                    <div>고유 식별자</div>
                    <div className="text-green-400">1</div>
                  </div>
                  <div className="grid grid-cols-4 gap-4 items-center py-2 border-b border-slate-700">
                    <div>document_id</div>
                    <div className="text-purple-400">UUID</div>
                    <div>원본 문서 참조 ID</div>
                    <div className="text-green-400">&apos;abc-123&apos;</div>
                  </div>
                  <div className="grid grid-cols-4 gap-4 items-center py-2 border-b border-slate-700">
                    <div>chunk_text</div>
                    <div className="text-purple-400">TEXT</div>
                    <div>분할된 텍스트 조각</div>
                    <div className="text-green-400">&quot;RAG는 LLM의...&quot;</div>
                  </div>
                  <div className="grid grid-cols-4 gap-4 items-center py-2 border-b border-slate-700">
                    <div>embedding</div>
                    <div className="text-yellow-400">VECTOR(1536)</div>
                    <div>텍스트의 의미 벡터</div>
                    <div className="text-green-400">[0.1, 0.9, ...]</div>
                  </div>
                  <div className="grid grid-cols-4 gap-4 items-center py-2">
                    <div>metadata</div>
                    <div className="text-yellow-400">JSONB</div>
                    <div>유연한 추가 정보</div>
                    <div className="text-green-400">{'{"page": 5}'}</div>
                  </div>
                </div>
              </div>
            </section>

            <section className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-2xl font-bold text-[#004AAD] mb-4 text-center">데이터 청크(Chunk)의 구성</h2>
              <p className="text-center text-gray-600 mb-4">
                각 데이터 행(청크)은 텍스트 내용, 의미를 담은 임베딩, 그리고 검색 필터링에 사용될 메타데이터로 구성됩니다.
              </p>
              <div className="relative w-full max-w-[600px] mx-auto h-[300px] max-h-[400px] md:h-[350px]">
                <canvas id="chunkCompositionChart"></canvas>
              </div>
            </section>

            <section className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-2xl font-bold text-[#004AAD] mb-4 text-center">스키마 설계 전략 비교</h2>
              <p className="text-center text-gray-600 mb-4">
                애플리케이션의 복잡성과 확장성 요구에 따라 적합한 테이블 스키마를 선택해야 합니다.
              </p>
              <div className="relative w-full max-w-[600px] mx-auto h-[300px] max-h-[400px] md:h-[350px]">
                <canvas id="schemaStrategyChart"></canvas>
              </div>
            </section>

            <section className="md:col-span-2 bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-2xl font-bold text-[#004AAD] mb-4 text-center">
                메타데이터의 힘: 단순 검색을 넘어 컨텍스트 검색으로
              </h2>
              <div className="flex flex-col md:flex-row items-center justify-center gap-8">
                <div className="text-center">
                  <div className="text-7xl font-extrabold text-[#0079E4]">75%</div>
                  <div className="text-xl font-semibold">검색 관련도 향상</div>
                  <p className="text-sm text-gray-500">(필터링 적용 시 예상치)</p>
                </div>
                <div className="border-l-4 border-[#6EC1E4] pl-6">
                  <p className="mb-2">
                    메타데이터 필터링은 의미적으로 유사하더라도 <strong>가장 적절한</strong> 정보만 LLM에 전달하도록 보장합니다.
                  </p>
                  <ul className="list-disc list-inside space-y-1 text-gray-700">
                    <li>
                      <strong>출처, 날짜, 태그</strong> 기반의 정밀 필터링
                    </li>
                    <li>멀티테넌시 환경에서의 <strong>데이터 격리</strong></li>
                    <li>사용자 권한에 따른 <strong>정보 접근 제어</strong></li>
                  </ul>
                </div>
              </div>
            </section>
          </main>

          <footer className="text-center mt-12 py-6 border-t border-gray-300">
            <p className="text-gray-600">
              성공적인 RAG 구현은 잘 설계된 데이터 구조에서 시작됩니다.
            </p>
          </footer>
        </div>
      </div>
    </>
  )
}

