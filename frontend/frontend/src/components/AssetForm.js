import React, { useEffect, useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const AssetForm = () => {
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({
    assetCost: '',
    purchaseDate: '',
    deliveryDate: '',
    depreciationRate: '',
    appreciationRate: '',
    categoryId: '',
    subCategoryId: '',
    locationId: '',
    departmentId: '',
    employeeId: '',
    supplierId: '',
    designation: '',
  });

  const [categories, setCategories] = useState([]);
  const [subcategories, setSubcategories] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [locations, setLocations] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [suppliers, setSuppliers] = useState([]);
  const [filteredSuppliers, setFilteredSuppliers] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);
const handleFileChange = (e) => {
  setSelectedFile(e.target.files[0]);
};
  useEffect(() => {
    axios.get('/api/categories').then(res => setCategories(res.data));
    axios.get('/api/locations').then(res => setLocations(res.data));
    axios.get('/api/employees').then(res => setEmployees(res.data));
    axios.get('/api/suppliers').then(res => setSuppliers(res.data));
  }, []);

  useEffect(() => {
    if (form.categoryId) {
      axios.get(`/api/subcategories?categoryId=${form.categoryId}`)
        .then(res => setSubcategories(res.data));

      const filtered = suppliers.filter(s => s.categoryId === Number(form.categoryId));
      setFilteredSuppliers(filtered);
    } else {
      setFilteredSuppliers([]);
    }
  }, [form.categoryId, suppliers]);

  useEffect(() => {
    if (form.locationId) {
      axios.get(`/api/departments?officeId=${form.locationId}`)
        .then(res => setDepartments(res.data));
    }
  }, [form.locationId]);

  useEffect(() => {
  if (form.employeeId && employees.length > 0) {
    const selectedEmp = employees.find(
      (emp) => String(emp.id) === String(form.employeeId)
    );
    if (selectedEmp) {
      setForm((prev) => ({
        ...prev,
        designation: selectedEmp.emp_designation || '',
      }));
    }
  }
}, [form.employeeId, employees]);

  const handleChange = (e) => {
  const { name, value } = e.target;
  const numericFields = ['categoryId', 'subCategoryId', 'locationId', 'departmentId', 'employeeId', 'supplierId'];
  setForm({ 
    ...form, 
    [name]: numericFields.includes(name) ? Number(value) : value 
  });
};

  const handleSubmit = async (e) => {
  e.preventDefault();


  // Format the form values
  const payload = {
    ...form,
    categoryId: form.categoryId || null,
    subCategoryId: form.subCategoryId || null,
    locationId: form.locationId || null,
    departmentId: form.departmentId || null,
    employeeId: form.employeeId || null,
    supplierId: form.supplierId || null,
    purchaseDate: form.purchaseDate
      ? new Date(form.purchaseDate).toISOString().split('T')[0]
      : null,
    deliveryDate: form.deliveryDate
      ? new Date(form.deliveryDate).toISOString().split('T')[0]
      : null,
  };

  // Build FormData and append each field
  const formData = new FormData();
  Object.entries(payload).forEach(([key, value]) => {
    if (value !== null && value !== undefined) {
      formData.append(key, value);
    }
  });

  // Add the file
  if (selectedFile) {
    formData.append('file', selectedFile);
  }
console.log("Payload before submission:", payload);
for (let [key, value] of formData.entries()) {
  console.log(`${key}: ${value}`);
}

  try {
    await axios.post('/api/assets', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    alert('Asset registered successfully!');
    window.location.reload();
  } catch (error) {
    console.error('Error submitting form:', error);
    alert('Submission failed.');
  }
};


  const inputClass = "form-control form-control-sm";

  const popupStyle = {
    position: 'fixed',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '600px',
    maxWidth: '100vw',
    backgroundColor: 'white',
    borderRadius: '8px',
    boxShadow: '0 0 15px rgba(0,0,0,0.3)',
    padding: '20px',
    zIndex: 1050,
  };

  return (
    <div style={popupStyle}>
      <form onSubmit={handleSubmit}>
        <h5 className="mb-3 text-center">Register Asset - Step {step}/2</h5>
        
        {step === 1 && (
          <>
            {/* Section 1: Basic Info */}
            <div className="row g-2 mb-2">
              <div className="col">
                <input type="number" className={inputClass} placeholder="Asset Cost" name="assetCost" value={form.assetCost} onChange={handleChange} required />
              </div>
              <div className="col">
                <select className={inputClass} name="categoryId" value={form.categoryId} onChange={handleChange} required>
                  <option value="">Select Category</option>
                  {categories.map(cat => <option key={cat.id} value={cat.id}>{cat.category}</option>)}
                </select>
              </div>
              <div className="col">
                <select className={inputClass} name="subCategoryId" value={form.subCategoryId} onChange={handleChange} required>
                  <option value="">Select Subcategory</option>
                  {subcategories.map(sub => <option key={sub.id} value={sub.id}>{sub.subCategory}</option>)}
                </select>
              </div>
            </div>

            {/* Section 2: Dates */}
            <div className="row g-2 mb-2">
              <div className="col">
                <DatePicker
                  selected={form.purchaseDate ? new Date(form.purchaseDate) : null}
                  onChange={(date) => setForm({ ...form, purchaseDate: date })}
                  className={inputClass}
                  placeholderText="Purchase Date"
                  dateFormat="yyyy-MM-dd"
                />
              </div>
              <div className="col">
                <DatePicker
                  selected={form.deliveryDate ? new Date(form.deliveryDate) : null}
                  onChange={(date) => setForm({ ...form, deliveryDate: date })}
                  className={inputClass}
                  placeholderText="Delivery Date"
                  dateFormat="yyyy-MM-dd"
                />
              </div>
            </div>

            {/* Section 3: Location and Department */}
            <div className="row g-2 mb-2">
              <div className="col">
                <select className={inputClass} name="locationId" value={form.locationId} onChange={handleChange} required>
                  <option value="">Select Location</option>
                  {locations.map(loc => <option key={loc.id} value={loc.id}>{loc.office_location}</option>)}
                </select>
              </div>
              <div className="col">
                <select className={inputClass} name="departmentId" value={form.departmentId} onChange={handleChange} required>
                  <option value="">Select Department</option>
                  {departments.map(dep => <option key={dep.id} value={dep.id}>{dep.dept_name}</option>)}
                </select>
              </div>
            </div>

            {/* Section 4: Employee & Designation */}
            <div className="row g-2 mb-2">
              <div className="col">
               <select name="employeeId" value={form.employeeId} onChange={handleChange} className={inputClass}>
  <option value="">Select Employee</option>
  {employees.map(emp => (
    <option key={emp.id} value={emp.id}>{emp.emp_name}</option>
  ))}
</select>

              </div>
              <div className="col">
                <input
                  type="text"
                  className={inputClass}
                  placeholder="Designation"
                  value={form.designation}
                  readOnly
                />
              </div>
            </div>

            {/* Section 5: Supplier */}
            <div className="row g-2 mb-2">
              <div className="col">
                <select name="supplierId" value={form.supplierId} onChange={handleChange} className={inputClass}>
  <option value="">Select Supplier</option>
  {filteredSuppliers.map(sup => (
    <option key={sup.id} value={sup.id}>{sup.supplier_name}</option>
  ))}
</select>

              </div>
            </div>

<div className="mb-2">
  <label htmlFor="invoiceFile" className="btn btn-outline-secondary btn-sm w-100 text-start">
    {selectedFile ? selectedFile.name : '📎 Upload Invoice'}
  </label>
  <input
    type="file"
    id="invoiceFile"
    className="d-none"
    onChange={handleFileChange}
  />
</div>


            {/* Section 6: Depreciation/Appreciation */}
            <div className="row g-2 mb-2">
              <div className="col">
                <input type="number" className={inputClass} placeholder="Depreciation (%)" name="depreciationRate" value={form.depreciationRate} onChange={handleChange} required />
              </div>
              <div className="col">
                <input type="number" className={inputClass} placeholder="Appreciation (%)" name="appreciationRate" value={form.appreciationRate} onChange={handleChange} required />
              </div>
            </div>
          </>
        )}

        {/* Step 2: Review Table */}
        {step === 2 && (
          <>
            <h6 className="fw-bold mb-2">Review Asset Info</h6>
            <table className="table table-sm table-bordered">
              <tbody>
                <tr><th>Asset Cost</th><td>{form.assetCost}</td></tr>
                <tr><th>Category</th><td>{categories.find(c => c.id === Number(form.categoryId))?.category || ''}</td></tr>
                <tr><th>Subcategory</th><td>{subcategories.find(s => s.id === Number(form.subCategoryId))?.subCategory || ''}</td></tr>
                <tr><th>Purchase Date</th><td>{form.purchaseDate ? new Date(form.purchaseDate).toLocaleDateString() : ''}</td></tr>
                <tr><th>Delivery Date</th><td>{form.deliveryDate ? new Date(form.deliveryDate).toLocaleDateString() : ''}</td></tr>
                <tr><th>Location</th><td>{locations.find(l => l.id === Number(form.locationId))?.office_location || ''}</td></tr>
                <tr><th>Department</th><td>{departments.find(d => d.id === Number(form.departmentId))?.dept_name || ''}</td></tr>
                <tr><th>Employee</th><td>{employees.find(e => e.id === Number(form.employeeId))?.emp_name || ''}</td></tr>
                <tr><th>Designation</th><td>{form.designation}</td></tr>
                <tr><th>Supplier</th><td>{filteredSuppliers.find(s => s.id === Number(form.supplierId))?.supplier_name || ''}</td></tr>
                <tr><th>Depreciation (%)</th><td>{form.depreciationRate}</td></tr>
                <tr><th>Appreciation (%)</th><td>{form.appreciationRate}</td></tr>
              </tbody>
            </table>
          </>
        )}

        {/* Navigation Buttons */}
        <div className="d-flex justify-content-between mt-3">
  {step > 1 && (
    <button
      type="button"
      className="btn btn-secondary btn-sm"
      onClick={(e) => {
        e.preventDefault(); // Just in case
        setStep(step - 1);
      }}
    >
      Back
    </button>
  )}
  
  {step < 2 ? (
    <button
      type="button"
      className="btn btn-primary btn-sm"
      onClick={(e) => {
        e.preventDefault(); // prevent form submission
        setStep(step + 1);  // go to next step
      }}
    >
      Next
    </button>
  ) : (
    <button type="submit" className="btn btn-success btn-sm">
      Submit
    </button>
  )}
</div>

      </form>
    </div>
  );
};

export default AssetForm;
