import { SelectableGridElement } from '../components/SelectableGridElement';
import { Search, Bell, User, Settings, TrendingUp, DollarSign, Users, Activity } from 'lucide-react';

export default function NestedGridTest() {
  return (
    <div className="min-h-screen bg-slate-50 p-8">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header com info */}
        <div className="bg-gradient-to-r from-violet-600 to-purple-600 text-white p-6 rounded-xl shadow-lg">
          <h1 className="text-2xl font-bold mb-2">🎯 Nested Grid Test Environment</h1>
          <p className="text-violet-100 text-sm mb-4">
            Ative <strong>Selection Mode</strong> no Grid Inspector (aba Advanced) para selecionar elementos específicos e aplicar configurações de grid individuais
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mt-4">
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3 border border-white/20">
              <div className="font-bold text-sm mb-1">1️⃣ Ative Selection Mode</div>
              <div className="text-xs text-violet-100">No Grid Inspector → Advanced → Selection Mode ON</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3 border border-white/20">
              <div className="font-bold text-sm mb-1">2️⃣ Clique em um elemento</div>
              <div className="text-xs text-violet-100">Elementos ficam destacados com borda azul no hover</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3 border border-white/20">
              <div className="font-bold text-sm mb-1">3️⃣ Configure o grid</div>
              <div className="text-xs text-violet-100">Ajuste colunas, gutter, margins apenas para ele</div>
            </div>
          </div>
        </div>

        {/* Dashboard Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Card 1 - Revenue */}
          <SelectableGridElement elementId="card-revenue" className="bg-white p-6 rounded-xl shadow-md">
            <div className="flex items-center justify-between mb-4">
              <DollarSign className="text-green-600" size={32} />
              <span className="text-xs font-semibold text-green-600 bg-green-50 px-2 py-1 rounded">+12.5%</span>
            </div>
            <h3 className="text-sm font-medium text-slate-600 mb-1">Total Revenue</h3>
            <p className="text-2xl font-bold text-slate-900">$45,231.89</p>
            <p className="text-xs text-slate-500 mt-2">+20.1% from last month</p>
          </SelectableGridElement>

          {/* Card 2 - Users */}
          <SelectableGridElement elementId="card-users" className="bg-white p-6 rounded-xl shadow-md">
            <div className="flex items-center justify-between mb-4">
              <Users className="text-blue-600" size={32} />
              <span className="text-xs font-semibold text-blue-600 bg-blue-50 px-2 py-1 rounded">+180</span>
            </div>
            <h3 className="text-sm font-medium text-slate-600 mb-1">Active Users</h3>
            <p className="text-2xl font-bold text-slate-900">2,350</p>
            <p className="text-xs text-slate-500 mt-2">+8% from last month</p>
          </SelectableGridElement>

          {/* Card 3 - Growth */}
          <SelectableGridElement elementId="card-growth" className="bg-white p-6 rounded-xl shadow-md">
            <div className="flex items-center justify-between mb-4">
              <TrendingUp className="text-purple-600" size={32} />
              <span className="text-xs font-semibold text-purple-600 bg-purple-50 px-2 py-1 rounded">+5.2%</span>
            </div>
            <h3 className="text-sm font-medium text-slate-600 mb-1">Growth Rate</h3>
            <p className="text-2xl font-bold text-slate-900">23.5%</p>
            <p className="text-xs text-slate-500 mt-2">Steady increase</p>
          </SelectableGridElement>

          {/* Card 4 - Activity */}
          <SelectableGridElement elementId="card-activity" className="bg-white p-6 rounded-xl shadow-md">
            <div className="flex items-center justify-between mb-4">
              <Activity className="text-orange-600" size={32} />
              <span className="text-xs font-semibold text-orange-600 bg-orange-50 px-2 py-1 rounded">Live</span>
            </div>
            <h3 className="text-sm font-medium text-slate-600 mb-1">Active Now</h3>
            <p className="text-2xl font-bold text-slate-900">573</p>
            <p className="text-xs text-slate-500 mt-2">Real-time monitoring</p>
          </SelectableGridElement>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Sidebar - Quick Actions */}
          <SelectableGridElement elementId="sidebar-actions" className="bg-white p-6 rounded-xl shadow-md">
            <h2 className="text-lg font-bold text-slate-900 mb-4">Quick Actions</h2>
            <div className="space-y-3">
              <button className="w-full flex items-center gap-3 p-3 bg-violet-50 hover:bg-violet-100 rounded-lg transition-colors">
                <Search size={18} className="text-violet-600" />
                <span className="text-sm font-medium text-slate-700">Search Records</span>
              </button>
              <button className="w-full flex items-center gap-3 p-3 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors">
                <Bell size={18} className="text-blue-600" />
                <span className="text-sm font-medium text-slate-700">Notifications</span>
              </button>
              <button className="w-full flex items-center gap-3 p-3 bg-green-50 hover:bg-green-100 rounded-lg transition-colors">
                <User size={18} className="text-green-600" />
                <span className="text-sm font-medium text-slate-700">User Profile</span>
              </button>
              <button className="w-full flex items-center gap-3 p-3 bg-slate-50 hover:bg-slate-100 rounded-lg transition-colors">
                <Settings size={18} className="text-slate-600" />
                <span className="text-sm font-medium text-slate-700">Settings</span>
              </button>
            </div>
          </SelectableGridElement>

          {/* Center - Data Table */}
          <SelectableGridElement elementId="data-table" className="lg:col-span-2 bg-white p-6 rounded-xl shadow-md">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-bold text-slate-900">Recent Transactions</h2>
              <button className="text-xs font-semibold text-violet-600 hover:text-violet-700">View All</button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-slate-200">
                    <th className="text-left text-xs font-semibold text-slate-600 pb-3">ID</th>
                    <th className="text-left text-xs font-semibold text-slate-600 pb-3">Customer</th>
                    <th className="text-left text-xs font-semibold text-slate-600 pb-3">Amount</th>
                    <th className="text-left text-xs font-semibold text-slate-600 pb-3">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { id: '#4521', customer: 'John Doe', amount: '$1,234.00', status: 'Completed' },
                    { id: '#4522', customer: 'Jane Smith', amount: '$892.50', status: 'Pending' },
                    { id: '#4523', customer: 'Bob Johnson', amount: '$2,156.00', status: 'Completed' },
                    { id: '#4524', customer: 'Alice Brown', amount: '$567.25', status: 'Failed' },
                  ].map((transaction, i) => (
                    <tr key={i} className="border-b border-slate-100">
                      <td className="py-3 text-sm text-slate-600">{transaction.id}</td>
                      <td className="py-3 text-sm font-medium text-slate-900">{transaction.customer}</td>
                      <td className="py-3 text-sm text-slate-900">{transaction.amount}</td>
                      <td className="py-3">
                        <span className={`text-xs font-semibold px-2 py-1 rounded ${
                          transaction.status === 'Completed' ? 'bg-green-100 text-green-700' :
                          transaction.status === 'Pending' ? 'bg-yellow-100 text-yellow-700' :
                          'bg-red-100 text-red-700'
                        }`}>
                          {transaction.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </SelectableGridElement>
        </div>

        {/* Bottom Grid - Complex Form */}
        <SelectableGridElement elementId="form-container" className="bg-white p-8 rounded-xl shadow-md">
          <h2 className="text-lg font-bold text-slate-900 mb-6">User Registration Form</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">First Name</label>
              <input
                type="text"
                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-violet-500 focus:border-violet-500"
                placeholder="Enter first name"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Last Name</label>
              <input
                type="text"
                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-violet-500 focus:border-violet-500"
                placeholder="Enter last name"
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-slate-700 mb-2">Email Address</label>
              <input
                type="email"
                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-violet-500 focus:border-violet-500"
                placeholder="your.email@example.com"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Phone</label>
              <input
                type="tel"
                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-violet-500 focus:border-violet-500"
                placeholder="+1 (555) 000-0000"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Department</label>
              <select className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-violet-500 focus:border-violet-500">
                <option>Engineering</option>
                <option>Design</option>
                <option>Marketing</option>
                <option>Sales</option>
              </select>
            </div>
          </div>
          <div className="mt-6 flex gap-3">
            <button className="px-6 py-2 bg-violet-600 hover:bg-violet-700 text-white font-medium rounded-lg transition-colors">
              Submit
            </button>
            <button className="px-6 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-medium rounded-lg transition-colors">
              Cancel
            </button>
          </div>
        </SelectableGridElement>
      </div>
    </div>
  );
}