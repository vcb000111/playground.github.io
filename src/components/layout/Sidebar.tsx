'use client';

import {
  Home, Wrench, Gamepad2, Calendar, MessagesSquare, Settings, ChevronLeft, ChevronRight, ChevronDown,
  Calculator, ArrowLeftRight, QrCode, Target, Dices, Puzzle
} from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useSidebar } from '@/contexts/SidebarContext';
import { useState } from 'react';

const menuItems = [
  { icon: Home, label: 'Trang chủ', href: '/' },
  {
    icon: Wrench,
    label: 'Tools',
    items: [
      { icon: Calculator, label: 'Máy tính', href: '/tools/calculator' },
      { icon: ArrowLeftRight, label: 'Chuyển đổi tiền tệ', href: '/tools/converter' },
      { icon: QrCode, label: 'Tạo mã QR', href: '/tools/qr-code' },
    ]
  },
  {
    icon: Gamepad2,
    label: 'Games',
    items: [
      { icon: Target, label: 'Cờ caro', href: '/games/tic-tac-toe' },
      { icon: Dices, label: 'Rắn săn mồi', href: '/games/snake' },
      { icon: Puzzle, label: 'Xếp hình', href: '/games/puzzle' },
    ]
  },
  { icon: Calendar, label: 'Lịch', href: '/calendar' },
  { icon: MessagesSquare, label: 'Tin nhắn', href: '/messages' },
  { icon: Settings, label: 'Cài đặt', href: '/settings' },
];

export default function Sidebar() {
  const pathname = usePathname();
  const { isCollapsed, toggleSidebar } = useSidebar();
  const [openDropdown, setOpenDropdown] = useState<string | null>(() => {
    if (pathname.startsWith('/tools/')) return 'Tools';
    if (pathname.startsWith('/games/')) return 'Games';
    return null;
  });

  const toggleDropdown = (label: string) => {
    setOpenDropdown(openDropdown === label ? null : label);
  };

  return (
    <div
      className={`fixed left-0 top-0 h-screen bg-white shadow-lg dark:bg-gray-900 transition-all duration-200 
      ${isCollapsed ? 'w-16' : 'w-64'}`}
    >
      {/* Logo section */}
      <div className="flex items-center justify-center h-16 border-b border-gray-200 dark:border-gray-800">
        <span className="text-xl font-bold animate-gradient-slow">
          {isCollapsed ? 'DP-IT' : 'DP-IT Playground'}
        </span>
      </div>

      {/* Menu items */}
      <nav className="p-2">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = item.href === '/'
            ? pathname === '/'
            : item.href
              ? pathname === item.href
              : pathname.startsWith(`/${item.label.toLowerCase()}`);
          const hasDropdown = !!item.items;
          const isOpen = openDropdown === item.label;

          return (
            <div key={item.label}>
              {hasDropdown ? (
                <div
                  onClick={() => toggleDropdown(item.label)}
                  className={`flex items-center h-12 my-1 rounded-lg transition-all duration-200 group relative cursor-pointer
                    ${isCollapsed ? 'w-12 mx-auto justify-center pl-2.5' : 'px-4'}
                    ${isActive
                      ? 'bg-blue-50 text-blue-600 dark:bg-gray-800 dark:text-blue-400'
                      : 'text-gray-600 hover:bg-gray-50 dark:text-gray-300 dark:hover:bg-gray-800'
                    }`}
                >
                  <div className={`flex items-center w-full transition-all duration-200 ${!isCollapsed && 'group-hover:translate-x-2.5'}`}>
                    <Icon className={`w-5 h-5 ${isActive ? 'text-blue-600 dark:text-blue-400' : ''}`} />
                    <span
                      className={`ml-3 font-medium whitespace-nowrap transition-all duration-200 
                          ${isCollapsed ? 'w-0 overflow-hidden opacity-0' : 'w-auto opacity-100'}`}
                    >
                      {item.label}
                    </span>
                    {!isCollapsed && (
                      <ChevronDown className={`w-4 h-4 ml-auto transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
                    )}
                  </div>
                </div>
              ) : (
                <Link
                  href={item.href || '/'}
                  className={`flex items-center h-12 my-1 rounded-lg transition-all duration-200 group relative
                      ${isCollapsed ? 'w-12 mx-auto justify-center pl-2.5' : 'px-4'}
                      ${isActive
                      ? 'bg-blue-50 text-blue-600 dark:bg-gray-800 dark:text-blue-400'
                      : 'text-gray-600 hover:bg-gray-50 dark:text-gray-300 dark:hover:bg-gray-800'
                    }`}
                >
                  <div className={`flex items-center w-full transition-all duration-200 ${!isCollapsed && 'group-hover:translate-x-2.5'}`}>
                    <Icon className={`w-5 h-5 ${isActive ? 'text-blue-600 dark:text-blue-400' : ''}`} />
                    <span
                      className={`ml-3 font-medium whitespace-nowrap transition-all duration-200 
                          ${isCollapsed ? 'w-0 overflow-hidden opacity-0' : 'w-auto opacity-100'}`}
                    >
                      {item.label}
                    </span>
                  </div>
                </Link>
              )}

              {/* Tooltip */}
              {isCollapsed && (
                <div className="absolute left-full top-1/2 -translate-y-1/2 ml-3 bg-gray-800 text-white text-sm rounded-md 
                  opacity-0 invisible group-hover:opacity-100 group-hover:visible 
                  transition-all duration-200 pointer-events-none whitespace-nowrap z-50
                  px-3 py-2 shadow-lg before:content-[''] before:absolute before:top-1/2 before:-left-1 
                  before:w-2 before:h-2 before:bg-gray-800 before:-translate-y-1/2 before:rotate-45">
                  {item.label}
                </div>
              )}

              {/* Dropdown items */}
              {!isCollapsed && hasDropdown && isOpen && (
                <div className="ml-4 pl-4 border-l border-gray-200 dark:border-gray-700 space-y-1">
                  {item.items?.map((subItem) => {
                    const SubIcon = subItem.icon;
                    return (
                      <Link
                        key={subItem.href}
                        href={subItem.href}
                        className={`flex items-center h-10 px-4 rounded-lg transition-all duration-200 group my-1
                          ${pathname === subItem.href
                            ? 'text-blue-600 bg-blue-50 dark:text-blue-400 dark:bg-gray-800'
                            : 'text-gray-600 hover:bg-gray-50 dark:text-gray-300 dark:hover:bg-gray-800'
                          }`}
                      >
                        <SubIcon className="w-4 h-4 mr-2" />
                        <span className="text-sm">{subItem.label}</span>
                      </Link>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </nav>

      {/* Toggle button */}
      <button
        onClick={toggleSidebar}
        className="absolute -right-4 top-20 bg-white dark:bg-gray-900 shadow-lg rounded-full p-1.5 hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-200"
      >
        {isCollapsed ? (
          <ChevronRight className="w-4 h-4" />
        ) : (
          <ChevronLeft className="w-4 h-4" />
        )}
      </button>
    </div>
  );
} 