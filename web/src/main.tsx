import React from 'react'
import ReactDOM from 'react-dom/client'
import { VisibilityProvider } from './providers/VisibilityProvider'
import { MantineProvider } from '@mantine/core'
import { ModalsProvider } from '@mantine/modals'
import { DatesProvider } from '@mantine/dates'
import Radar from './components/Radar'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <MantineProvider theme={{ colorScheme:'dark' }}>
      <ModalsProvider>
        <VisibilityProvider componentName="Radar">
          <Radar />
        </VisibilityProvider>
      </ModalsProvider>
    </MantineProvider>
  </React.StrictMode>
)