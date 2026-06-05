import React from 'react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar
} from 'recharts';

interface ChartCardProps {
  title: string;
  type: 'area' | 'radar';
  data: any[];
  height?: number;
}

export const ChartCard: React.FC<ChartCardProps> = ({
  title,
  type,
  data,
  height = 300
}) => {
  return (
    <div className="glass-card p-5 sm:p-6 rounded-2xl border border-white/5 flex flex-col justify-between">
      <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-6">{title}</h3>
      
      <div style={{ width: '100%', height }} className="font-mono text-[10px]">
        <ResponsiveContainer width="100%" height="100%">
          {type === 'area' ? (
            <AreaChart data={data} margin={{ top: 10, right: 10, left: -25, bottom: 0 }}>
              <defs>
                <linearGradient id="colorScore" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#6366F1" stopOpacity={0.4} />
                  <stop offset="95%" stopColor="#6366F1" stopOpacity={0.0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.03)" vertical={false} />
              <XAxis 
                dataKey="name" 
                stroke="#6B7280" 
                fontSize={10} 
                tickLine={false} 
                axisLine={false} 
              />
              <YAxis 
                stroke="#6B7280" 
                fontSize={10} 
                tickLine={false} 
                axisLine={false} 
                domain={[0, 100]}
              />
              <Tooltip 
                contentStyle={{ 
                  background: '#111827', 
                  borderColor: 'rgba(255,255,255,0.08)',
                  borderRadius: '12px',
                  color: '#F9FAFB',
                  fontFamily: 'monospace'
                }} 
              />
              <Area 
                type="monotone" 
                dataKey="score" 
                stroke="#6366F1" 
                strokeWidth={2}
                fillOpacity={1} 
                fill="url(#colorScore)" 
              />
            </AreaChart>
          ) : (
            <RadarChart cx="50%" cy="50%" outerRadius="80%" data={data}>
              <PolarGrid stroke="rgba(255,255,255,0.05)" />
              <PolarAngleAxis 
                dataKey="subject" 
                stroke="#9CA3AF" 
                fontSize={10} 
              />
              <PolarRadiusAxis 
                angle={30} 
                domain={[0, 100]} 
                stroke="#4B5563" 
                fontSize={8} 
              />
              <Radar
                name="Candidate Score"
                dataKey="A"
                stroke="#06B6D4"
                fill="#06B6D4"
                fillOpacity={0.25}
              />
              <Radar
                name="Target Benchmark"
                dataKey="B"
                stroke="#8B5CF6"
                fill="#8B5CF6"
                fillOpacity={0.1}
              />
              <Tooltip 
                contentStyle={{ 
                  background: '#111827', 
                  borderColor: 'rgba(255,255,255,0.08)',
                  borderRadius: '12px',
                  color: '#F9FAFB',
                  fontFamily: 'monospace'
                }} 
              />
            </RadarChart>
          )}
        </ResponsiveContainer>
      </div>
    </div>
  );
};
export default ChartCard;
