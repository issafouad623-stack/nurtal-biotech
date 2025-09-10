import { format, formatDistanceToNow } from 'date-fns';

export const formatDate = (date: string | Date | null | undefined): string => {
  if (!date) return 'No date';
  
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  
  // Check if date is valid
  if (isNaN(dateObj.getTime())) {
    return 'Invalid date';
  }
  
  return format(dateObj, 'MMMM d, yyyy');
};

export const formatRelativeDate = (date: string | Date | null | undefined): string => {
  if (!date) return 'No date';
  
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  
  // Check if date is valid
  if (isNaN(dateObj.getTime())) {
    return 'Invalid date';
  }
  
  return formatDistanceToNow(dateObj, { addSuffix: true });
};

export const formatReadTime = (minutes: number): string => {
  if (minutes < 1) return 'Less than 1 min read';
  if (minutes === 1) return '1 min read';
  return `${minutes} min read`;
};

export const generateSlug = (title: string): string => {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
};

export const truncateText = (text: string, maxLength: number): string => {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength).trim() + '...';
};

export const getCategoryColor = (category: string): string => {
  const colors = {
    AI: 'bg-gradient-to-r from-purple-500 to-pink-500',
    Biotechnology: 'bg-gradient-to-r from-blue-500 to-cyan-500',
    Research: 'bg-gradient-to-r from-green-500 to-emerald-500',
    Innovation: 'bg-gradient-to-r from-orange-500 to-red-500',
    Startup: 'bg-gradient-to-r from-indigo-500 to-purple-500',
  };
  return colors[category as keyof typeof colors] || 'bg-gray-500';
};
