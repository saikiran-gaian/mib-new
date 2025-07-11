import React, { useState, useMemo } from 'react';
import { Users, Activity, TrendingUp, AlertTriangle, CheckCircle, XCircle, Search, Calendar, Award, Building2, Clock, Target, BarChart3, GitBranch, FileText, Bug, Zap, Shield, Timer, Gauge, ChevronRight, Briefcase } from 'lucide-react';

interface BoardHealth {
  velocity: number;
  blockers: number;
  overdue: number;
  completed: number;
  status: 'healthy' | 'warning' | 'critical';
  sprintGoal: string;
  sprintUnderstanding: 'A' | 'B' | 'C';
  estimationAccuracy: number;
  documentation: number;
  umlDiagrams: number;
  defectRemovalRate: number;
  defectRemovalSprint: number;
  defectRemovalFuture: number;
  devCount: number;
  sprintDates: string;
  backlogItems: number;
  doneRatio: number;
  doneGoals: number;
  pendingDeployment: number;
  productionLive: number;
  w1: { bl: number; dr: number; dg: number; pd: number; pl: number; devCount: number };
  w2: { bl: number; dr: number; dg: number; pd: number; pl: number; devCount: number };
  w3: { bl: number; dr: number; dg: number; pd: number; pl: number; devCount: number };
  w4: { bl: number; dr: number; dg: number; pd: number; pl: number; devCount: number };
}

interface Board {
  id: string;
  name: string;
  project: string;
  sprint: string;
  projectManager: string;
  totalIssues: number;
  remainingIssues: number;
  health: BoardHealth;
}

interface EngineeringManager {
  id: string;
  name: string;
  title: string;
  avatar: string;
  experience: string;
  understandingLevel: 'A' | 'B' | 'C';
  understandingTargetDate: string;
  department: string;
  teamsCount: number;
  boards: Board[];
}

const mockData: EngineeringManager[] = [
  {
    id: '1',
    name: 'Sarah Johnson',
    title: 'Senior Engineering Manager',
    avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
    experience: '8+ years',
    understandingLevel: 'A',
    understandingTargetDate: '2024-06-15',
    department: 'Platform Engineering',
    teamsCount: 3,
    boards: [
      {
        id: 'board-1',
        name: 'Platform Core',
        project: 'PLAT',
        sprint: 'Sprint 23',
        projectManager: 'John Smith',
        totalIssues: 45,
        remainingIssues: 13,
        health: {
          velocity: 85,
          blockers: 2,
          overdue: 1,
          completed: 32,
          status: 'healthy',
          sprintGoal: 'Implement new authentication system',
          sprintUnderstanding: 'A',
          estimationAccuracy: 92.5,
          documentation: 8,
          umlDiagrams: 3,
          defectRemovalRate: 2,
          defectRemovalSprint: 1,
          defectRemovalFuture: 0,
          devCount: 8,
          sprintDates: 'Jul 7th - Jul 21st',
          backlogItems: 15,
          doneRatio: 8,
          doneGoals: 12,
          pendingDeployment: 3,
          productionLive: 9,
          w1: { bl: 1, dr: 0, dg: 0, pd: 0, pl: 0, devCount: 1 },
          w2: { bl: 0, dr: 0, dg: 0, pd: 0, pl: 0, devCount: 1 },
          w3: { bl: 0, dr: 0, dg: 0, pd: 0, pl: 0, devCount: 1 },
          w4: { bl: 2, dr: 3, dg: 0, pd: 0, pl: 0, devCount: 1 }
        }
      },
      {
        id: 'board-2',
        name: 'API Gateway',
        project: 'API',
        sprint: 'Sprint 15',
        projectManager: 'Lisa Chen',
        totalIssues: 28,
        remainingIssues: 11,
        health: {
          velocity: 72,
          blockers: 4,
          overdue: 3,
          completed: 17,
          status: 'warning',
          sprintGoal: 'Optimize API response times',
          sprintUnderstanding: 'B',
          estimationAccuracy: 78.3,
          documentation: 5,
          umlDiagrams: 2,
          defectRemovalRate: 3,
          defectRemovalSprint: 2,
          defectRemovalFuture: 1,
          devCount: 6,
          sprintDates: 'Jul 1st - Jul 15th',
          backlogItems: 12,
          doneRatio: 6,
          doneGoals: 8,
          pendingDeployment: 2,
          productionLive: 6,
          w1: { bl: 1, dr: 1, dg: 0, pd: 0, pl: 0, devCount: 2 },
          w2: { bl: 0, dr: 0, dg: 0, pd: 0, pl: 0, devCount: 1 },
          w3: { bl: 0, dr: 0, dg: 0, pd: 0, pl: 0, devCount: 1 },
          w4: { bl: 0, dr: 0, dg: 0, pd: 0, pl: 0, devCount: 0 }
        }
      }
    ]
  },
  {
    id: '2',
    name: 'Marcus Chen',
    title: 'Engineering Manager',
    avatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
    experience: '6+ years',
    understandingLevel: 'B',
    understandingTargetDate: '2024-09-30',
    department: 'Mobile Development',
    teamsCount: 2,
    boards: [
      {
        id: 'board-3',
        name: 'Mobile App',
        project: 'MOB',
        sprint: 'Sprint 31',
        projectManager: 'David Kim',
        totalIssues: 62,
        remainingIssues: 19,
        health: {
          velocity: 90,
          blockers: 1,
          overdue: 0,
          completed: 43,
          status: 'healthy',
          sprintGoal: 'Launch new user onboarding flow',
          sprintUnderstanding: 'A',
          estimationAccuracy: 95.2,
          documentation: 12,
          umlDiagrams: 5,
          defectRemovalRate: 1,
          defectRemovalSprint: 0,
          defectRemovalFuture: 1,
          devCount: 10,
          sprintDates: 'Jul 5th - Jul 19th',
          backlogItems: 20,
          doneRatio: 15,
          doneGoals: 18,
          pendingDeployment: 2,
          productionLive: 16,
          w1: { bl: 5, dr: 18, dg: 0, pd: 0, pl: 1, devCount: 4 },
          w2: { bl: 42, dr: 0, dg: 0, pd: 0, pl: 0, devCount: 12 },
          w3: { bl: 0, dr: 0, dg: 0, pd: 0, pl: 1, devCount: 2 },
          w4: { bl: 0, dr: 0, dg: 0, pd: 0, pl: 0, devCount: 0 }
        }
      },
      {
        id: 'board-4',
        name: 'User Experience',
        project: 'UX',
        sprint: 'Sprint 12',
        projectManager: 'Emma Wilson',
        totalIssues: 35,
        remainingIssues: 22,
        health: {
          velocity: 45,
          blockers: 8,
          overdue: 7,
          completed: 13,
          status: 'critical',
          sprintGoal: 'No Goals Defined',
          sprintUnderstanding: 'C',
          estimationAccuracy: 45.8,
          documentation: 2,
          umlDiagrams: 0,
          defectRemovalRate: 6,
          defectRemovalSprint: 4,
          defectRemovalFuture: 2,
          devCount: 5,
          sprintDates: 'Jun 28th - Jul 12th',
          backlogItems: 8,
          doneRatio: 3,
          doneGoals: 5,
          pendingDeployment: 7,
          productionLive: 3,
          w1: { bl: 0, dr: 0, dg: 0, pd: 0, pl: 0, devCount: 4 },
          w2: { bl: 0, dr: 0, dg: 0, pd: 0, pl: 0, devCount: 2 },
          w3: { bl: 0, dr: 0, dg: 0, pd: 0, pl: 0, devCount: 1 },
          w4: { bl: 0, dr: 0, dg: 0, pd: 0, pl: 0, devCount: 0 }
        }
      }
    ]
  },
  {
    id: '3',
    name: 'Emily Rodriguez',
    title: 'Principal Engineering Manager',
    avatar: 'https://images.pexels.com/photos/762020/pexels-photo-762020.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
    experience: '12+ years',
    understandingLevel: 'A',
    understandingTargetDate: '2024-03-20',
    department: 'Data & Analytics',
    teamsCount: 4,
    boards: [
      {
        id: 'board-5',
        name: 'Data Pipeline',
        project: 'DATA',
        sprint: 'Sprint 8',
        projectManager: 'Michael Brown',
        totalIssues: 52,
        remainingIssues: 16,
        health: {
          velocity: 78,
          blockers: 3,
          overdue: 2,
          completed: 36,
          status: 'healthy',
          sprintGoal: 'Implement real-time data processing',
          sprintUnderstanding: 'B',
          estimationAccuracy: 88.7,
          documentation: 10,
          umlDiagrams: 4,
          defectRemovalRate: 2,
          defectRemovalSprint: 1,
          defectRemovalFuture: 1,
          devCount: 12,
          sprintDates: 'Jul 3rd - Jul 17th',
          backlogItems: 18,
          doneRatio: 12,
          doneGoals: 15,
          pendingDeployment: 3,
          productionLive: 12,
          w1: { bl: 1, dr: 3, dg: 0, pd: 0, pl: 0, devCount: 1 },
          w2: { bl: 0, dr: 0, dg: 0, pd: 0, pl: 0, devCount: 1 },
          w3: { bl: 0, dr: 0, dg: 0, pd: 0, pl: 0, devCount: 1 },
          w4: { bl: 0, dr: 0, dg: 0, pd: 0, pl: 0, devCount: 3 }
        }
      }
    ]
  }
];

const HealthMetric: React.FC<{ 
  label: string; 
  value: number | string; 
  icon: React.ReactNode; 
  variant: 'success' | 'warning' | 'error' | 'info';
  className?: string;
}> = ({ label, value, icon, variant, className = "" }) => {
  const variantStyles = {
    success: 'bg-emerald-50 border-emerald-200 text-emerald-700',
    warning: 'bg-amber-50 border-amber-200 text-amber-700',
    error: 'bg-red-50 border-red-200 text-red-700',
    info: 'bg-blue-50 border-blue-200 text-blue-700'
  };

  return (
    <div className={`p-3 rounded-lg border ${variantStyles[variant]} ${className}`}>
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <div className="flex-shrink-0">
            {icon}
          </div>
          <div className="min-w-0 flex-1">
            <div className="text-xs font-medium uppercase tracking-wide opacity-75 truncate">{label}</div>
            <div className="text-sm font-bold truncate">{value}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

const SprintCard: React.FC<{ board: Board }> = ({ board }) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'healthy': return 'bg-emerald-500';
      case 'warning': return 'bg-amber-500';
      case 'critical': return 'bg-red-500';
      default: return 'bg-slate-500';
    }
  };

  const getUnderstandingColor = (level: string) => {
    switch (level) {
      case 'A': return 'bg-emerald-100 text-emerald-800 border-emerald-200';
      case 'B': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'C': return 'bg-amber-100 text-amber-800 border-amber-200';
      default: return 'bg-slate-100 text-slate-800 border-slate-200';
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 hover:shadow-md transition-all duration-200">
      {/* Sprint Header */}
      <div className="p-4 border-b border-slate-100">
        <div className="flex items-start justify-between">
          <div className="flex-1 min-w-0">
            <div className="flex items-center space-x-3 mb-2">
              <div className={`w-3 h-3 rounded-full ${getStatusColor(board.health.status)} flex-shrink-0`}></div>
              <h3 className="text-lg font-semibold text-slate-900 truncate">{board.sprint}</h3>
              <div className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium border ${getUnderstandingColor(board.health.sprintUnderstanding)}`}>
                {board.health.sprintUnderstanding} Level
              </div>
            </div>
            <p className="text-sm text-slate-600 mb-2 line-clamp-2">{board.health.sprintGoal}</p>
            <div className="flex items-center text-xs text-slate-500">
              <Calendar className="w-3 h-3 mr-1 flex-shrink-0" />
              <span className="truncate">{board.health.sprintDates}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Board Info */}
      <div className="p-4 border-b border-slate-100">
        <div className="flex items-center justify-between mb-3">
          <div className="flex-1 min-w-0">
            <h4 className="text-base font-semibold text-slate-900 truncate">{board.name}</h4>
            <p className="text-sm text-slate-600 truncate">{board.projectManager}</p>
          </div>
          <div className="flex items-center space-x-2 flex-shrink-0">
            <span className="bg-slate-100 text-slate-700 px-2 py-1 rounded text-xs font-medium">
              {board.project}
            </span>
          </div>
        </div>
        
        <div className="grid grid-cols-2 gap-3">
          <div className="text-center p-2 bg-blue-50 rounded-lg">
            <div className="text-lg font-bold text-blue-600">{board.totalIssues}</div>
            <div className="text-xs text-blue-600 font-medium">Total Issues</div>
          </div>
          <div className="text-center p-2 bg-amber-50 rounded-lg">
            <div className="text-lg font-bold text-amber-600">{board.remainingIssues}</div>
            <div className="text-xs text-amber-600 font-medium">Remaining</div>
          </div>
        </div>
      </div>

      {/* Health Metrics */}
      <div className="p-4">
        <h5 className="text-xs font-semibold text-slate-700 uppercase tracking-wide mb-3">Health Metrics</h5>
        <div className="grid grid-cols-2 gap-2">
          <HealthMetric
            label="Velocity"
            value={`${board.health.velocity}%`}
            icon={<TrendingUp className="w-3 h-3" />}
            variant={board.health.velocity >= 80 ? 'success' : board.health.velocity >= 60 ? 'warning' : 'error'}
          />
          
          <HealthMetric
            label="Blockers"
            value={board.health.blockers}
            icon={<AlertTriangle className="w-3 h-3" />}
            variant={board.health.blockers === 0 ? 'success' : board.health.blockers <= 3 ? 'warning' : 'error'}
          />
          
          <HealthMetric
            label="Overdue"
            value={board.health.overdue}
            icon={<XCircle className="w-3 h-3" />}
            variant={board.health.overdue === 0 ? 'success' : board.health.overdue <= 2 ? 'warning' : 'error'}
          />
          
          <HealthMetric
            label="E/S Rate"
            value={`${board.health.estimationAccuracy}%`}
            icon={<Target className="w-3 h-3" />}
            variant={board.health.estimationAccuracy >= 85 ? 'success' : board.health.estimationAccuracy >= 70 ? 'warning' : 'error'}
          />
          
          <HealthMetric
            label="Docs"
            value={board.health.documentation}
            icon={<FileText className="w-3 h-3" />}
            variant="info"
          />
          
          <HealthMetric
            label="Defects"
            value={board.health.defectRemovalRate}
            icon={<Bug className="w-3 h-3" />}
            variant={board.health.defectRemovalRate <= 2 ? 'success' : board.health.defectRemovalRate <= 4 ? 'warning' : 'error'}
          />
        </div>
      </div>
    </div>
  );
};

const WeeklyMetricsCard: React.FC<{ board: Board }> = ({ board }) => {
  const weeks = [
    { key: 'w1', label: 'W1', data: board.health.w1, dates: 'Jul 14-18', color: 'indigo' },
    { key: 'w2', label: 'W2', data: board.health.w2, dates: 'Jul 21-25', color: 'cyan' },
    { key: 'w3', label: 'W3', data: board.health.w3, dates: 'Jul 28-Aug 1', color: 'teal' },
    { key: 'w4', label: 'W4', data: board.health.w4, dates: 'Aug 4-8', color: 'rose' }
  ];

  const getColorClasses = (color: string) => {
    const colors = {
      indigo: 'bg-indigo-50 border-indigo-200 text-indigo-800',
      cyan: 'bg-cyan-50 border-cyan-200 text-cyan-800',
      teal: 'bg-teal-50 border-teal-200 text-teal-800',
      rose: 'bg-rose-50 border-rose-200 text-rose-800'
    };
    return colors[color as keyof typeof colors] || colors.indigo;
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200">
      <div className="p-4 border-b border-slate-100">
        <h4 className="text-sm font-semibold text-slate-900">Weekly Metrics</h4>
        <p className="text-xs text-slate-600 mt-1">{board.name}</p>
      </div>
      
      <div className="p-4 space-y-3">
        {weeks.map((week) => (
          <div key={week.key} className={`rounded-lg p-3 border ${getColorClasses(week.color)}`}>
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center space-x-2">
                <span className="text-sm font-bold">{week.label}</span>
                <span className="text-xs opacity-75">({week.dates})</span>
              </div>
              <span className="text-xs font-medium">Dev: {week.data.devCount}</span>
            </div>
            
            <div className="grid grid-cols-5 gap-2 text-center">
              <div>
                <div className="text-sm font-bold">{week.data.bl}</div>
                <div className="text-xs opacity-75">BL</div>
              </div>
              <div>
                <div className="text-sm font-bold">{week.data.dr}</div>
                <div className="text-xs opacity-75">DR</div>
              </div>
              <div>
                <div className="text-sm font-bold">{week.data.dg}</div>
                <div className="text-xs opacity-75">DG</div>
              </div>
              <div>
                <div className="text-sm font-bold">{week.data.pd}</div>
                <div className="text-xs opacity-75">PD</div>
              </div>
              <div>
                <div className="text-sm font-bold">{week.data.pl}</div>
                <div className="text-xs opacity-75">PL</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const ManagerCard: React.FC<{ em: EngineeringManager }> = ({ em }) => {
  const getRatingColor = (rating: string) => {
    switch (rating) {
      case 'A': return 'bg-emerald-100 text-emerald-800 border-emerald-200';
      case 'B': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'C': return 'bg-amber-100 text-amber-800 border-amber-200';
      default: return 'bg-slate-100 text-slate-800 border-slate-200';
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 hover:shadow-md transition-all duration-200">
      <div className="p-6">
        <div className="flex items-start space-x-4 mb-4">
          <div className="relative flex-shrink-0">
            <img 
              src={em.avatar} 
              alt={em.name}
              className="w-12 h-12 rounded-lg object-cover border border-slate-200"
            />
            <div className={`absolute -top-1 -right-1 w-6 h-6 rounded-full border-2 border-white flex items-center justify-center text-xs font-bold ${getRatingColor(em.understandingLevel)}`}>
              {em.understandingLevel}
            </div>
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="text-lg font-semibold text-slate-900 truncate">{em.name}</h3>
            <p className="text-sm text-slate-600 truncate">{em.title}</p>
            <div className="flex items-center mt-1">
              <Building2 className="w-3 h-3 text-slate-400 mr-1 flex-shrink-0" />
              <span className="text-xs text-slate-500 truncate">{em.department}</span>
            </div>
          </div>
        </div>
        
        <div className="space-y-3">
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-slate-50 rounded-lg p-3">
              <div className="flex items-center space-x-2 mb-1">
                <Briefcase className="w-3 h-3 text-slate-500 flex-shrink-0" />
                <span className="text-xs font-medium text-slate-700 truncate">Experience</span>
              </div>
              <div className="text-sm font-semibold text-slate-900">{em.experience}</div>
            </div>
            
            <div className="bg-slate-50 rounded-lg p-3">
              <div className="flex items-center space-x-2 mb-1">
                <Clock className="w-3 h-3 text-slate-500 flex-shrink-0" />
                <span className="text-xs font-medium text-slate-700 truncate">Target A</span>
              </div>
              <div className="text-xs font-semibold text-slate-900">{formatDate(em.understandingTargetDate)}</div>
            </div>
          </div>
          
          <div className="flex items-center justify-between pt-3 border-t border-slate-100">
            <div className="flex items-center space-x-2">
              <Users className="w-4 h-4 text-slate-500 flex-shrink-0" />
              <span className="text-sm text-slate-700">{em.teamsCount} Teams</span>
            </div>
            <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs font-medium">
              {em.boards.length} Boards
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

function App() {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredData = useMemo(() => {
    if (!searchTerm) return mockData;
    
    return mockData.filter(em => 
      em.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      em.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      em.department.toLowerCase().includes(searchTerm.toLowerCase()) ||
      em.boards.some(board => 
        board.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        board.project.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  }, [searchTerm]);

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-slate-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-slate-900">Engineering Dashboard</h1>
              <p className="text-slate-600 text-sm sm:text-base mt-1">Board of Boards Overview • Real-time Engineering Metrics</p>
            </div>
            
            {/* Search Box */}
            <div className="relative w-full sm:w-80">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-4 w-4 text-slate-400" />
              </div>
              <input
                type="text"
                placeholder="Search managers, teams, or boards..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="block w-full pl-10 pr-3 py-2 border border-slate-300 rounded-lg text-sm placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {filteredData.length === 0 ? (
          <div className="text-center py-16">
            <div className="text-slate-400 text-xl">No results found for "{searchTerm}"</div>
            <p className="text-slate-500 mt-2">Try adjusting your search terms</p>
          </div>
        ) : (
          <div className="space-y-8">
            {filteredData.map((em) => (
              <div key={em.id} className="bg-white rounded-xl shadow-sm border border-slate-200">
                <div className="p-6">
                  {/* Manager Header */}
                  <div className="mb-6">
                    <ManagerCard em={em} />
                  </div>

                  {/* Boards Grid */}
                  <div className="space-y-6">
                    {em.boards.map((board) => (
                      <div key={board.id} className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                        {/* Sprint Card */}
                        <div className="lg:col-span-1">
                          <SprintCard board={board} />
                        </div>

                        {/* Weekly Metrics */}
                        <div className="lg:col-span-1 xl:col-span-2">
                          <WeeklyMetricsCard board={board} />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default App;