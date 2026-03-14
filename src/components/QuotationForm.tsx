import { useState } from 'react';
import { Trash2, Download, Search } from 'lucide-react';

interface QuotationItem {
  id: number;
  material: string;
  quantity: number;
  amount: number;
}

export default function QuotationForm() {
  const [items, setItems] = useState<QuotationItem[]>([
    { id: 1, material: '', quantity: 1, amount: 0 }
  ]);

  const [clientName, setClientName] = useState('');
  const [clientEmail, setClientEmail] = useState('');
  const [clientPhone, setClientPhone] = useState('');
  const [eventType, setEventType] = useState('');
  const [quotationDate, setQuotationDate] = useState(
    new Date().toISOString().split('T')[0]
  );
  const [eventDate, setEventDate] = useState('');
  const [transportationCharge, setTransportationCharge] = useState(0);
  const [loading, setLoading] = useState(false);
  const [searchingQuotation, setSearchingQuotation] = useState(false);
  const [searchQuotationNumber, setSearchQuotationNumber] = useState('');
  const [currentQuotationNumber, setCurrentQuotationNumber] = useState('');
  const [isEditMode, setIsEditMode] = useState(false);

  const addItem = () => {
    const newId = Math.max(0, ...items.map(item => item.id)) + 1;
    setItems([
      ...items,
      { id: newId, material: '', quantity: 1, amount: 0 }
    ]);
  };

  const removeItem = (id: number) => {
    setItems(items.filter(item => item.id !== id));
  };

  const updateItem = (
    id: number,
    field: keyof QuotationItem,
    value: string | number
  ) => {
    setItems(
      items.map(item =>
        item.id === id
          ? {
              ...item,
              [field]:
                field === 'material' ? value : Number(value)
            }
          : item
      )
    );
  };

  const calculateTotal = () => {
    return items.reduce((sum, item) => sum + item.quantity * item.amount, 0);
  };

  const handleSearchQuotation = async () => {
    if (!searchQuotationNumber.trim()) {
      alert('Please enter a quotation number');
      return;
    }

    setSearchingQuotation(true);

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/quotation/${searchQuotationNumber}`,
        {
          method: 'GET'
        }
      );

      if (!response.ok) {
        throw new Error('Quotation not found');
      }

      const data = await response.json();
      const quotation = data.quotation;

      // Populate form with quotation data
      setClientName(quotation.clientName);
      setClientEmail(quotation.clientEmail || '');
      setClientPhone(quotation.clientPhone || '');
      setEventType(quotation.eventType || '');
      setQuotationDate(quotation.quotationDate);
      setEventDate(quotation.eventDate || '');
      setTransportationCharge(quotation.transportationCharge || 0);
      
      // Map quotation items to form items with id
      const mappedItems = quotation.items.map((item: QuotationItem, index: number) => ({
        id: index + 1,
        material: item.material,
        quantity: item.quantity,
        amount: item.amount
      }));
      setItems(mappedItems);
      
      setCurrentQuotationNumber(searchQuotationNumber);
      setIsEditMode(true);
      setSearchQuotationNumber('');
      
      alert('Quotation loaded successfully!');
    } catch (error) {
      console.error('Error fetching quotation:', error);
      alert('Error fetching quotation. Please check the quotation number and try again.');
    } finally {
      setSearchingQuotation(false);
    }
  };

  const handleCreateOrUpdatePDF = async () => {
    // Validate form
    if (!clientName.trim()) {
      alert('Please enter client name');
      return;
    }

    if (items.some(item => !item.material.trim() || item.amount === 0)) {
      alert('Please fill all item details (material name and amount)');
      return;
    }

    setLoading(true);

    try {
      let quotationNumber = currentQuotationNumber;
      
      // If not in edit mode, save first to get quotation number
      if (!isEditMode) {
        const saveResponse = await fetch(
          `${import.meta.env.VITE_API_URL}/api/quotation/save`,
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              quotationNumber: '',
              clientName,
              clientEmail,
              clientPhone,
              eventType,
              quotationDate,
              eventDate,
              // eslint-disable-next-line @typescript-eslint/no-unused-vars
              items: items.map(({ id: _id, ...rest }) => rest),
              total: calculateTotal(),
              transportationCharge
            })
          }
        );

        if (!saveResponse.ok) {
          throw new Error('Failed to save quotation');
        }

        const saveData = await saveResponse.json();
        quotationNumber = saveData.quotation.quotationNumber;
        setCurrentQuotationNumber(quotationNumber);
        setIsEditMode(true);
      } else {
        // Update existing quotation
        const updateResponse = await fetch(
          `${import.meta.env.VITE_API_URL}/api/quotation/${currentQuotationNumber}`,
          {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              clientName,
              clientEmail,
              clientPhone,
              eventType,
              quotationDate,
              eventDate,
              // eslint-disable-next-line @typescript-eslint/no-unused-vars
              items: items.map(({ id: _id, ...rest }) => rest),
              total: calculateTotal(),
              transportationCharge
            })
          }
        );

        if (!updateResponse.ok) {
          throw new Error('Failed to update quotation');
        }
      }

      // Generate PDF
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/quotation/generate-pdf`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            clientName,
            clientEmail,
            clientPhone,
            eventType,
            quotationDate,
            eventDate,
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            items: items.map(({ id: _id, ...rest }) => rest),
            total: calculateTotal(),
            transportationCharge
          })
        }
      );

      if (!response.ok) {
        throw new Error('Failed to generate PDF');
      }

      // Download the PDF
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `Quotation_${clientName}_${quotationDate}.pdf`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);

      alert('Quotation saved and PDF generated successfully!');
    } catch (error) {
      console.error('Error:', error);
      alert('Error processing quotation. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleNewQuotation = () => {
    setItems([{ id: 1, material: '', quantity: 1, amount: 0 }]);
    setClientName('');
    setClientEmail('');
    setClientPhone('');
    setEventType('');
    setQuotationDate(new Date().toISOString().split('T')[0]);
    setEventDate('');
    setTransportationCharge(0);
    setCurrentQuotationNumber('');
    setIsEditMode(false);
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow max-w-4xl">
      <h2
        className="text-2xl font-semibold mb-6 text-[#1a1a2e]"
        style={{ fontFamily: 'Playfair Display, serif' }}
      >
        Create Quotation
      </h2>

      {/* Search Section */}
      <div className="mb-8 p-4 bg-gray-50 rounded-lg border border-gray-200">
        <label className="block text-sm font-medium text-gray-700 mb-3">
          Search Existing Quotation
        </label>
        <div className="flex gap-2 mb-2">
          <input
            type="text"
            value={searchQuotationNumber}
            onChange={e => setSearchQuotationNumber(e.target.value)}
            placeholder="Enter quotation number"
            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#d4af37]"
            disabled={searchingQuotation}
          />
          <button
            onClick={handleSearchQuotation}
            disabled={searchingQuotation}
            className="flex items-center gap-2 px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition font-medium disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Search size={18} />
            {searchingQuotation ? 'Searching...' : 'Search'}
          </button>
        </div>
        {isEditMode && (
          <p className="text-sm text-blue-600">
            ✓ Editing quotation: {currentQuotationNumber}
            <button
              onClick={handleNewQuotation}
              className="ml-3 text-[#d4af37] hover:text-yellow-600 font-medium"
            >
              Create New
            </button>
          </p>
        )}
      </div>

      {/* Client Details */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Client Name *
          </label>
          <input
            type="text"
            value={clientName}
            onChange={e => setClientName(e.target.value)}
            placeholder="Enter client name"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#d4af37]"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Email
          </label>
          <input
            type="email"
            value={clientEmail}
            onChange={e => setClientEmail(e.target.value)}
            placeholder="Enter email"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#d4af37]"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Phone
          </label>
          <input
            type="tel"
            value={clientPhone}
            onChange={e => setClientPhone(e.target.value)}
            placeholder="Enter phone number"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#d4af37]"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Event Type
          </label>
          <input
            type="text"
            value={eventType}
            onChange={e => setEventType(e.target.value)}
            placeholder="e.g., Wedding, Birthday"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#d4af37]"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Quotation Date
          </label>
          <input
            type="date"
            value={quotationDate}
            onChange={e => setQuotationDate(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#d4af37]"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Event Date
          </label>
          <input
            type="date"
            value={eventDate}
            onChange={e => setEventDate(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#d4af37]"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Transportation Charge (₹)
          </label>
          <input
            type="number"
            value={transportationCharge}
            onChange={e => setTransportationCharge(Number(e.target.value))}
            placeholder="0"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#d4af37]"
          />
        </div>
      </div>

      {/* Items Table */}
      <div className="mb-8">
        <h3 className="text-lg font-semibold text-[#1a1a2e] mb-4">
          Quotation Items
        </h3>

        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-100">
                <th className="border border-gray-300 px-4 py-3 text-left text-sm font-semibold">
                  Material/Particle Name *
                </th>
                <th className="border border-gray-300 px-4 py-3 text-left text-sm font-semibold">
                  Quantity *
                </th>
                <th className="border border-gray-300 px-4 py-3 text-left text-sm font-semibold">
                  Amount (₹) *
                </th>
                <th className="border border-gray-300 px-4 py-3 text-center text-sm font-semibold">
                  Total (₹)
                </th>
                <th className="border border-gray-300 px-4 py-3 text-center text-sm font-semibold">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {items.map(item => (
                <tr key={item.id} className="hover:bg-gray-50">
                  <td className="border border-gray-300 px-4 py-3">
                    <input
                      type="text"
                      value={item.material}
                      onChange={e =>
                        updateItem(item.id, 'material', e.target.value)
                      }
                      placeholder="e.g., Flowers, Decorations"
                      className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#d4af37]"
                    />
                  </td>
                  <td className="border border-gray-300 px-4 py-3">
                    <input
                      type="number"
                      value={item.quantity}
                      onChange={e =>
                        updateItem(
                          item.id,
                          'quantity',
                          e.target.value
                        )
                      }
                      min="1"
                      className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#d4af37]"
                    />
                  </td>
                  <td className="border border-gray-300 px-4 py-3">
                    <input
                      type="number"
                      value={item.amount}
                      onChange={e =>
                        updateItem(item.id, 'amount', e.target.value)
                      }
                      placeholder="0"
                      className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#d4af37]"
                    />
                  </td>
                  <td className="border border-gray-300 px-4 py-3 text-center font-semibold">
                    ₹{(item.quantity * item.amount).toFixed(2)}
                  </td>
                  <td className="border border-gray-300 px-4 py-3 text-center">
                    <button
                      onClick={() => removeItem(item.id)}
                      className={`inline-block p-2 rounded-lg transition ${
                        items.length === 1
                          ? 'text-gray-300 cursor-not-allowed'
                          : 'text-red-600 hover:bg-red-50'
                      }`}
                      disabled={items.length === 1}
                      title={
                        items.length === 1
                          ? 'At least one item required'
                          : 'Remove item'
                      }
                    >
                      <Trash2 size={18} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <button
          onClick={addItem}
          className="mt-4 px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition font-medium"
        >
          + Add Another Item
        </button>
      </div>

      {/* Total */}
      <div className="flex justify-end mb-8">
        <div className="bg-[#1a1a2e] text-white px-8 py-6 rounded-lg min-w-96">
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-lg font-semibold">Items Total:</span>
              <span className="text-lg">₹{calculateTotal().toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-lg font-semibold">Transportation Charge:</span>
              <span className="text-lg">₹{transportationCharge.toFixed(2)}</span>
            </div>
            <div className="border-t border-gray-400 pt-3 flex justify-between">
              <span className="text-xl font-bold">Grand Total:</span>
              <span className="text-3xl font-bold text-[#d4af37]">
                ₹{(calculateTotal() + transportationCharge).toFixed(2)}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-4 justify-end">
        <button
          onClick={handleCreateOrUpdatePDF}
          disabled={loading}
          className="flex items-center gap-2 px-8 py-3 bg-[#d4af37] text-black rounded-lg hover:bg-yellow-500 transition font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Download size={20} />
          {loading ? 'Processing...' : isEditMode ? 'Update & Download PDF' : 'Create PDF'}
        </button>
      </div>
    </div>
  );

}