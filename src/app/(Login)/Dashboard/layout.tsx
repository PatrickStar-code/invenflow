import { SidebarComponent } from '@/app/components/sideBarComponent'
import React, { ReactNode } from 'react'

export default function layout({ children }: { children: ReactNode }) {
  return (
    <SidebarComponent>
      {' '}
      <div id="modal-root" />
      {children}
    </SidebarComponent>
  )
}
