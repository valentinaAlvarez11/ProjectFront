"use client";

import React from 'react';
import { admin } from '@/utils/Tokens';

interface Tab {
  id: string;
  label: string;
  icon?: React.ReactNode;
}

interface TabsProps {
  tabs: Tab[];
  activeTab: string;
  onTabChange: (tabId: string) => void;
}

export default function Tabs({ tabs, activeTab, onTabChange }: TabsProps) {
  return (
    <div className={admin.tabs.container}>
      <div className={admin.tabs.tabsWrapper}>
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className={`${admin.tabs.tab} ${
              activeTab === tab.id
                ? admin.tabs.tabActive
                : admin.tabs.tabInactive
            }`}
          >
            <div className={admin.tabs.tabContent}>
              {tab.icon && tab.icon}
              <span>{tab.label}</span>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
