import React, { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import { Container } from '../components/layout/Container';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { Textarea } from '../components/ui/Textarea';
import { Select } from '../components/ui/Select';
import { StatusBadge } from '../components/ui/StatusBadge';
import { Modal } from '../components/ui/Modal';
import type { Ticket, TicketFormData, TicketStatus } from '../types';
import { storage } from '../utils/storage';
import { validateTicketForm } from '../utils/validation';

export const TicketsPage: React.FC = () => {
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedTicket, setSelectedTicket] = useState<Ticket | null>(null);
  const [formData, setFormData] = useState<TicketFormData>({
    title: '',
    description: '',
    status: 'open',
    priority: 'medium',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [filterStatus, setFilterStatus] = useState<TicketStatus | 'all'>('all');

  // Load tickets on mount
  useEffect(() => {
    loadTickets();
  }, []);

  const loadTickets = () => {
    const loadedTickets = storage.getTickets();
    setTickets(loadedTickets);
  };

  const filteredTickets = filterStatus === 'all'
    ? tickets
    : tickets.filter(t => t.status === filterStatus);

  const resetForm = () => {
    setFormData({
      title: '',
      description: '',
      status: 'open',
      priority: 'medium',
    });
    setErrors({});
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleCreate = () => {
    // Validate form
    const validationErrors = validateTicketForm(
      formData.title,
      formData.status,
      formData.description
    );

    if (validationErrors.length > 0) {
      const errorMap: Record<string, string> = {};
      validationErrors.forEach(err => {
        errorMap[err.field] = err.message;
      });
      setErrors(errorMap);
      toast.error('Please fix the errors in the form');
      return;
    }

    const newTicket: Ticket = {
      id: `ticket_${Date.now()}`,
      title: formData.title,
      description: formData.description,
      status: formData.status,
      priority: formData.priority,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    storage.addTicket(newTicket);
    loadTickets();
    setIsCreateModalOpen(false);
    resetForm();
    toast.success('Ticket created successfully!');
  };

  const handleEdit = (ticket: Ticket) => {
    setSelectedTicket(ticket);
    setFormData({
      title: ticket.title,
      description: ticket.description || '',
      status: ticket.status,
      priority: ticket.priority || 'medium',
    });
    setIsEditModalOpen(true);
  };

  const handleUpdate = () => {
    if (!selectedTicket) return;

    // Validate form
    const validationErrors = validateTicketForm(
      formData.title,
      formData.status,
      formData.description
    );

    if (validationErrors.length > 0) {
      const errorMap: Record<string, string> = {};
      validationErrors.forEach(err => {
        errorMap[err.field] = err.message;
      });
      setErrors(errorMap);
      toast.error('Please fix the errors in the form');
      return;
    }

    storage.updateTicket(selectedTicket.id, formData);
    loadTickets();
    setIsEditModalOpen(false);
    setSelectedTicket(null);
    resetForm();
    toast.success('Ticket updated successfully!');
  };

  const handleDeleteConfirm = (ticket: Ticket) => {
    setSelectedTicket(ticket);
    setIsDeleteModalOpen(true);
  };

  const handleDelete = () => {
    if (!selectedTicket) return;

    storage.deleteTicket(selectedTicket.id);
    loadTickets();
    setIsDeleteModalOpen(false);
    setSelectedTicket(null);
    toast.success('Ticket deleted successfully!');
  };

  const statusOptions = [
    { value: 'open', label: 'Open' },
    { value: 'in_progress', label: 'In Progress' },
    { value: 'closed', label: 'Closed' },
  ];

  const priorityOptions = [
    { value: 'low', label: 'Low' },
    { value: 'medium', label: 'Medium' },
    { value: 'high', label: 'High' },
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <Container>
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Tickets</h1>
            <p className="text-gray-600 mt-2">Manage and track all your tickets</p>
          </div>
          <Button onClick={() => setIsCreateModalOpen(true)} size="lg">
            <svg
              className="w-5 h-5 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 4v16m8-8H4"
              />
            </svg>
            Create Ticket
          </Button>
        </div>

        {/* Filters */}
        <div className="mb-6">
          <div className="flex gap-2 flex-wrap">
            <button
              onClick={() => setFilterStatus('all')}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                filterStatus === 'all'
                  ? 'bg-blue-600 text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-100'
              }`}
            >
              All ({tickets.length})
            </button>
            <button
              onClick={() => setFilterStatus('open')}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                filterStatus === 'open'
                  ? 'bg-green-600 text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-100'
              }`}
            >
              Open ({tickets.filter(t => t.status === 'open').length})
            </button>
            <button
              onClick={() => setFilterStatus('in_progress')}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                filterStatus === 'in_progress'
                  ? 'bg-amber-600 text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-100'
              }`}
            >
              In Progress ({tickets.filter(t => t.status === 'in_progress').length})
            </button>
            <button
              onClick={() => setFilterStatus('closed')}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                filterStatus === 'closed'
                  ? 'bg-gray-600 text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-100'
              }`}
            >
              Closed ({tickets.filter(t => t.status === 'closed').length})
            </button>
          </div>
        </div>

        {/* Tickets Grid */}
        {filteredTickets.length === 0 ? (
          <Card className="text-center py-12">
            <svg
              className="mx-auto h-12 w-12 text-gray-400 mb-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
              />
            </svg>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No tickets found</h3>
            <p className="text-gray-600 mb-4">
              {filterStatus === 'all'
                ? 'Get started by creating your first ticket'
                : `No ${filterStatus.replace('_', ' ')} tickets`}
            </p>
            {filterStatus === 'all' && (
              <Button onClick={() => setIsCreateModalOpen(true)}>Create Ticket</Button>
            )}
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredTickets.map(ticket => (
              <Card key={ticket.id}>
                <div className="flex justify-between items-start mb-3">
                  <StatusBadge status={ticket.status} />
                  {ticket.priority && (
                    <span
                      className={`text-xs px-2 py-1 rounded ${
                        ticket.priority === 'high'
                          ? 'bg-red-100 text-red-800'
                          : ticket.priority === 'medium'
                          ? 'bg-yellow-100 text-yellow-800'
                          : 'bg-blue-100 text-blue-800'
                      }`}
                    >
                      {ticket.priority.toUpperCase()}
                    </span>
                  )}
                </div>

                <h3 className="text-lg font-semibold text-gray-900 mb-2">{ticket.title}</h3>
                {ticket.description && (
                  <p className="text-gray-600 text-sm mb-4 line-clamp-3">{ticket.description}</p>
                )}

                <div className="text-xs text-gray-500 mb-4">
                  <p>Created: {new Date(ticket.createdAt).toLocaleDateString()}</p>
                  <p>Updated: {new Date(ticket.updatedAt).toLocaleDateString()}</p>
                </div>

                <div className="flex gap-2">
                  <Button
                    onClick={() => handleEdit(ticket)}
                    variant="secondary"
                    size="sm"
                    className="flex-1"
                  >
                    Edit
                  </Button>
                  <Button
                    onClick={() => handleDeleteConfirm(ticket)}
                    variant="danger"
                    size="sm"
                    className="flex-1"
                  >
                    Delete
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        )}

        {/* Create Modal */}
        <Modal
          isOpen={isCreateModalOpen}
          onClose={() => {
            setIsCreateModalOpen(false);
            resetForm();
          }}
          title="Create New Ticket"
        >
          <div className="space-y-4">
            <Input
              label="Title *"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              error={errors.title}
              placeholder="Enter ticket title"
            />

            <Textarea
              label="Description"
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              error={errors.description}
              placeholder="Enter ticket description (optional)"
              rows={4}
            />

            <Select
              label="Status *"
              name="status"
              value={formData.status}
              onChange={handleInputChange}
              error={errors.status}
              options={statusOptions}
            />

            <Select
              label="Priority"
              name="priority"
              value={formData.priority}
              onChange={handleInputChange}
              options={priorityOptions}
            />

            <div className="flex gap-3 pt-4">
              <Button onClick={handleCreate} className="flex-1">
                Create Ticket
              </Button>
              <Button
                onClick={() => {
                  setIsCreateModalOpen(false);
                  resetForm();
                }}
                variant="secondary"
                className="flex-1"
              >
                Cancel
              </Button>
            </div>
          </div>
        </Modal>

        {/* Edit Modal */}
        <Modal
          isOpen={isEditModalOpen}
          onClose={() => {
            setIsEditModalOpen(false);
            setSelectedTicket(null);
            resetForm();
          }}
          title="Edit Ticket"
        >
          <div className="space-y-4">
            <Input
              label="Title *"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              error={errors.title}
              placeholder="Enter ticket title"
            />

            <Textarea
              label="Description"
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              error={errors.description}
              placeholder="Enter ticket description (optional)"
              rows={4}
            />

            <Select
              label="Status *"
              name="status"
              value={formData.status}
              onChange={handleInputChange}
              error={errors.status}
              options={statusOptions}
            />

            <Select
              label="Priority"
              name="priority"
              value={formData.priority}
              onChange={handleInputChange}
              options={priorityOptions}
            />

            <div className="flex gap-3 pt-4">
              <Button onClick={handleUpdate} className="flex-1">
                Update Ticket
              </Button>
              <Button
                onClick={() => {
                  setIsEditModalOpen(false);
                  setSelectedTicket(null);
                  resetForm();
                }}
                variant="secondary"
                className="flex-1"
              >
                Cancel
              </Button>
            </div>
          </div>
        </Modal>

        {/* Delete Confirmation Modal */}
        <Modal
          isOpen={isDeleteModalOpen}
          onClose={() => {
            setIsDeleteModalOpen(false);
            setSelectedTicket(null);
          }}
          title="Delete Ticket"
        >
          <div>
            <p className="text-gray-600 mb-6">
              Are you sure you want to delete "{selectedTicket?.title}"? This action cannot be
              undone.
            </p>
            <div className="flex gap-3">
              <Button onClick={handleDelete} variant="danger" className="flex-1">
                Delete
              </Button>
              <Button
                onClick={() => {
                  setIsDeleteModalOpen(false);
                  setSelectedTicket(null);
                }}
                variant="secondary"
                className="flex-1"
              >
                Cancel
              </Button>
            </div>
          </div>
        </Modal>
      </Container>
    </div>
  );
};
