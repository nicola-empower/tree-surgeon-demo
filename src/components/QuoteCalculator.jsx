import React, { useState, useEffect } from 'react';
import { Download, Trash2, TrendingUp, TrendingDown, Plus, LayoutDashboard } from 'lucide-react';

const QuoteCalculator = () => {
  const [quotes, setQuotes] = useState([]);
  const [sortConfig, setSortConfig] = useState({ key: 'clientName', direction: 'asc' });
  const [formData, setFormData] = useState({
    clientName: '',
    materialsCost: '',
    labourHours: '',
    hourlyRate: '',
    profitMargin: ''
  });

  // Load quotes from local storage on mount
  useEffect(() => {
    const savedQuotes = localStorage.getItem('trade_quotes');
    if (savedQuotes) {
      setQuotes(JSON.parse(savedQuotes));
    }
  }, []);

  // Save quotes to local storage whenever they change
  useEffect(() => {
    localStorage.setItem('trade_quotes', JSON.stringify(quotes));
  }, [quotes]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const calculateQuote = (e) => {
    e.preventDefault();
    const materials = parseFloat(formData.materialsCost) || 0;
    const hours = parseFloat(formData.labourHours) || 0;
    const rate = parseFloat(formData.hourlyRate) || 0;
    const margin = parseFloat(formData.profitMargin) || 0;

    const labourCost = hours * rate;
    const totalCost = materials + labourCost;
    const profitAmount = totalCost * (margin / 100);
    const finalQuote = totalCost + profitAmount;
    const vatAmount = finalQuote * 0.20;
    const totalQuoteVat = finalQuote + vatAmount;

    const newQuote = {
      id: Date.now(),
      ...formData,
      materialsCost: materials,
      labourHours: hours,
      hourlyRate: rate,
      profitMargin: margin,
      labourCost,
      totalCost,
      profitAmount,
      finalQuote,
      vatAmount,
      totalQuoteVat
    };

    setQuotes(prev => [...prev, newQuote]);
    setFormData({
      clientName: '',
      materialsCost: '',
      labourHours: '',
      hourlyRate: '',
      profitMargin: ''
    });
  };

  const deleteQuote = (id) => {
    setQuotes(prev => prev.filter(q => q.id !== id));
  };

  const requestSort = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  const sortedQuotes = [...quotes].sort((a, b) => {
    if (a[sortConfig.key] < b[sortConfig.key]) {
      return sortConfig.direction === 'asc' ? -1 : 1;
    }
    if (a[sortConfig.key] > b[sortConfig.key]) {
      return sortConfig.direction === 'asc' ? 1 : -1;
    }
    return 0;
  });

  const exportCSV = () => {
    const headers = [
      'Client Name', 'Materials Cost', 'Labour Hours', 'Hourly Rate', 'Profit Margin (%)',
      'Labour Cost', 'Total Cost', 'Profit Amount', 'Final Quote (ex VAT)', 'VAT', 'Total (inc VAT)'
    ];
    
    const rows = quotes.map(q => [
      `"${q.clientName}"`, q.materialsCost, q.labourHours, q.hourlyRate, q.profitMargin,
      q.labourCost.toFixed(2), q.totalCost.toFixed(2), q.profitAmount.toFixed(2),
      q.finalQuote.toFixed(2), q.vatAmount.toFixed(2), q.totalQuoteVat.toFixed(2)
    ]);

    const csvContent = "data:text/csv;charset=utf-8," 
      + headers.join(",") + "\n" 
      + rows.map(e => e.join(",")).join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "quote_command_export.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const formatCurrency = (val) => new Intl.NumberFormat('en-GB', { style: 'currency', currency: 'GBP' }).format(val);

  return (
    <div className="grid lg:grid-cols-3 gap-8">
      {/* Input Form */}
      <div className="lg:col-span-1">
        <div className="bg-white rounded-2xl shadow-xl p-6 sm:p-8 sticky top-8 border border-gray-100">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-3 bg-accent/10 rounded-full text-accent">
                <Plus size={24} />
            </div>
            <h2 className="text-2xl font-bold text-gray-900">New Estimate</h2>
          </div>
          
          <form onSubmit={calculateQuote} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Client Name</label>
              <input
                type="text"
                name="clientName"
                value={formData.clientName}
                onChange={handleInputChange}
                className="block w-full px-4 py-3 bg-gray-50 border-transparent rounded-xl focus:border-accent focus:bg-white focus:ring-0 transition-colors"
                placeholder="e.g. Smith Residence"
                required
              />
            </div>
            
            <div className="grid grid-cols-2 gap-5">
                <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Materials (£)</label>
                <input
                    type="number"
                    name="materialsCost"
                    value={formData.materialsCost}
                    onChange={handleInputChange}
                    min="0"
                    step="0.01"
                    className="block w-full px-4 py-3 bg-gray-50 border-transparent rounded-xl focus:border-accent focus:bg-white focus:ring-0 transition-colors"
                    placeholder="0.00"
                    required
                />
                </div>
                <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Hours</label>
                <input
                    type="number"
                    name="labourHours"
                    value={formData.labourHours}
                    onChange={handleInputChange}
                    min="0"
                    step="0.5"
                    className="block w-full px-4 py-3 bg-gray-50 border-transparent rounded-xl focus:border-accent focus:bg-white focus:ring-0 transition-colors"
                    placeholder="0"
                    required
                />
                </div>
            </div>

            <div className="grid grid-cols-2 gap-5">
                <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Rate (£/hr)</label>
                <input
                    type="number"
                    name="hourlyRate"
                    value={formData.hourlyRate}
                    onChange={handleInputChange}
                    min="0"
                    step="0.01"
                    className="block w-full px-4 py-3 bg-gray-50 border-transparent rounded-xl focus:border-accent focus:bg-white focus:ring-0 transition-colors"
                    placeholder="45.00"
                    required
                />
                </div>
                <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Margin (%)</label>
                <input
                    type="number"
                    name="profitMargin"
                    value={formData.profitMargin}
                    onChange={handleInputChange}
                    min="0"
                    className="block w-full px-4 py-3 bg-gray-50 border-transparent rounded-xl focus:border-accent focus:bg-white focus:ring-0 transition-colors"
                    placeholder="20"
                    required
                />
                </div>
            </div>

            <button
              type="submit"
              className="w-full flex justify-center py-4 px-4 border border-transparent rounded-xl shadow-lg text-lg font-bold text-white bg-accent hover:opacity-90 transition-all transform hover:scale-[1.02]"
            >
              Calculate Quote
            </button>
          </form>
        </div>
      </div>

      {/* Dashboard */}
      <div className="lg:col-span-2">
        <div className="bg-white rounded-2xl shadow-xl p-6 sm:p-8 border border-gray-100 h-full">
          <div className="flex flex-wrap justify-between items-center mb-8 gap-4">
             <div className="flex items-center gap-3">
                <div className="p-3 bg-primary/10 rounded-full text-primary">
                    <LayoutDashboard size={24} />
                </div>
                <h2 className="text-2xl font-bold text-gray-900">Active Quotes</h2>
            </div>
            {quotes.length > 0 && (
                <button
                onClick={exportCSV}
                className="flex items-center gap-2 py-2 px-5 border-2 border-primary/10 text-primary font-semibold rounded-full hover:bg-primary hover:text-white transition-all"
                >
                <Download size={18} />
                Export CSV
                </button>
            )}
          </div>

          <div className="overflow-x-auto">
            {quotes.length === 0 ? (
              <div className="text-center py-20 bg-gray-50 rounded-xl border border-dashed border-gray-200">
                <p className="text-gray-500 text-lg">No quotes generated yet.</p>
                <p className="text-sm text-gray-400 mt-2">Use the estimator to create your first quote.</p>
              </div>
            ) : (
              <table className="min-w-full divide-y divide-gray-100">
                <thead>
                  <tr>
                    <th 
                        onClick={() => requestSort('clientName')}
                        className="px-4 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider cursor-pointer hover:text-accent"
                    >
                        Client
                    </th>
                    <th 
                        onClick={() => requestSort('labourHours')}
                        className="px-4 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider cursor-pointer hover:text-accent"
                    >
                        Hours
                    </th>
                    <th 
                        onClick={() => requestSort('profitAmount')}
                        className="px-4 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider cursor-pointer hover:text-accent"
                    >
                        Profit
                    </th>
                    <th 
                        onClick={() => requestSort('totalQuoteVat')}
                        className="px-4 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider cursor-pointer hover:text-accent"
                    >
                        Total (Inc VAT)
                    </th>
                    <th className="px-4 py-3"></th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {sortedQuotes.map((quote) => (
                    <tr key={quote.id} className="hover:bg-gray-50/50 transition-colors group">
                      <td className="px-4 py-4 whitespace-nowrap">
                        <div className="font-bold text-gray-900">{quote.clientName}</div>
                        <div className="text-xs text-gray-400">Mat: {formatCurrency(quote.materialsCost)}</div>
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-600">
                        {quote.labourHours} hrs
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap text-sm font-bold text-green-600 bg-green-50 rounded-lg">
                        {formatCurrency(quote.profitAmount)}
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap text-base font-bold text-gray-900">
                        {formatCurrency(quote.totalQuoteVat)}
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap text-right">
                        <button
                          onClick={() => deleteQuote(quote.id)}
                          className="text-gray-300 hover:text-red-500 transition-colors p-2 rounded-full hover:bg-red-50"
                        >
                          <Trash2 size={18} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuoteCalculator;
