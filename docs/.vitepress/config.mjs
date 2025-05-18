import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "Glucose Drives Brain Aging: Evidence from Imaging, Plasma Metabolomics, and Genetic Causal Inference",
  description: "A VitePress Site",
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Home', link: '/' },
      // { text: 'Examples', link: '/markdown-examples' }
    ],

    sidebar: [
      {
        text: 'Navigation',
        items: [
          { text: 'Codes for R', link: '/doc/code',
            items: [
              { text: 's0_cov_clean.R', link: '/doc/R/s0-cov-clean' },
              { text: 's1_select_pro.R', link: '/doc/R/s1-select-pro' },
              { text: 's2_brain_cox.R', link: '/doc/R/s2-brain-cox' },
              { text: 's3_brain_structure.R', link: '/doc/R/s3-brain-structure' },
              { text: 's4_calclate_formal.R', link: '/doc/R/s4-calclate-formal' },
              { text: 's5_brain_functon.R', link: '/doc/R/s5-brain-function' }
            ]
          },
          { text: 'Codes for Python', link: '/doc/code',
            items: [
              { text: 's1_creat_brain.py', link: '/doc/python/s1-creat-brain' }
            ]
          },
          { text: 'Codes for Matlab', link: '/doc/code',
            items: [
              { text: 's1_brain_split.m', link: '/doc/Matlab/s1-brain-split' }
              // { text: 's2_paint_brain.m', link: '/doc/Matlab/s2-paint-brain' }
            ]
          },
          { text: 'Results', link: '/doc/results' }
        ]
      }
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/Dapu-Li' }
    ],
    footer: {
      copyright: 'Copyright © 2025-present Zhirong Li'
  }
  },
})
