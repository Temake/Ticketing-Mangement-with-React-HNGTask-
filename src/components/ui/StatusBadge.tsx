import React from 'react';
import type { TicketStatus } from '../../types';

interface BadgeProps {
  status: TicketStatus;
  className?: string;
}

export const StatusBadge: React.FC<BadgeProps> = ({ status, className = '' }) => {
  const statusConfig = {
    open: {
      color: 'bg-green-100 text-green-800 border-green-200',
      label: 'Open',
    },
    in_progress: {
      color: 'bg-amber-100 text-amber-800 border-amber-200',
      label: 'In Progress',
    },
    closed: {
      color: 'bg-gray-100 text-gray-800 border-gray-200',
      label: 'Closed',
    },
  };

  const config = statusConfig[status];

  return (
    <span
      className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border ${config.color} ${className}`}
    >
      {config.label}
    </span>
  );
};
