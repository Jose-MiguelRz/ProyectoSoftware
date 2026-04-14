// Base de datos mockup para la aplicación
export interface Company {
  id: string;
  name: string;
  description: string;
  location: string;
  industry: string;
  contactEmail: string;
  website?: string;
  logo?: string;
  isActive: boolean;
  createdAt: string;
}

export interface Document {
  id: string;
  title: string;
  description: string;
  type: 'pdf' | 'doc' | 'xls' | 'ppt';
  category: 'application' | 'guide' | 'contract' | 'other';
  companyId?: string;
  downloadUrl: string;
  fileSize: string;
  uploadedAt: string;
}

export interface Guide {
  id: string;
  title: string;
  description: string;
  content: string;
  category: 'application' | 'internship' | 'documents' | 'general';
  order: number;
  isActive: boolean;
  createdAt: string;
}

export interface Appointment {
  id: string;
  studentId: string;
  companyId: string;
  date: string;
  time: string;
  type: 'interview' | 'meeting' | 'presentation';
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
  notes?: string;
  createdAt: string;
}

export interface User {
  id: string;
  studentId: string;
  name: string;
  email: string;
  career: string;
  semester: number;
  createdAt: string;
}

// Datos mockup
export const mockCompanies: Company[] = [
  {
    id: '1',
    name: 'Tecnológico de Monterrey',
    description: 'Institución educativa líder en México especializada en ingeniería y tecnología.',
    location: 'Monterrey, NL',
    industry: 'Educación',
    contactEmail: 'practicas@tec.mx',
    website: 'https://www.tec.mx',
    isActive: true,
    createdAt: '2024-01-15'
  },
  {
    id: '2',
    name: 'CEMEX',
    description: 'Empresa multinacional mexicana líder en la industria cementera y de construcción.',
    location: 'Monterrey, NL',
    industry: 'Construcción',
    contactEmail: 'talento@cemex.com',
    website: 'https://www.cemex.com',
    isActive: true,
    createdAt: '2024-01-20'
  },
  {
    id: '3',
    name: 'BBVA México',
    description: 'Banco líder en México ofreciendo servicios financieros innovadores.',
    location: 'Ciudad de México',
    industry: 'Finanzas',
    contactEmail: 'practicas@bbva.mx',
    website: 'https://www.bbva.mx',
    isActive: true,
    createdAt: '2024-01-25'
  }
];

export const mockDocuments: Document[] = [
  {
    id: '1',
    title: 'Carta de Presentación',
    description: 'Plantilla para carta de presentación profesional',
    type: 'doc',
    category: 'application',
    downloadUrl: '/documents/carta-presentacion.docx',
    fileSize: '25 KB',
    uploadedAt: '2024-01-10'
  },
  {
    id: '2',
    title: 'Currículum Vitae',
    description: 'Formato estándar para CV de estudiantes',
    type: 'pdf',
    category: 'application',
    downloadUrl: '/documents/cv-template.pdf',
    fileSize: '150 KB',
    uploadedAt: '2024-01-12'
  },
  {
    id: '3',
    title: 'Guía de Prácticas 2024',
    description: 'Manual completo del proceso de prácticas profesionales',
    type: 'pdf',
    category: 'guide',
    downloadUrl: '/documents/guia-practicas-2024.pdf',
    fileSize: '2.5 MB',
    uploadedAt: '2024-01-05'
  }
];

export const mockGuides: Guide[] = [
  {
    id: '1',
    title: 'Paso 1: Preparación de Documentos',
    description: 'Cómo preparar tu currículum y carta de presentación',
    content: 'Contenido detallado sobre preparación de documentos...',
    category: 'application',
    order: 1,
    isActive: true,
    createdAt: '2024-01-01'
  },
  {
    id: '2',
    title: 'Paso 2: Búsqueda de Empresas',
    description: 'Dónde y cómo buscar oportunidades de prácticas',
    content: 'Contenido sobre búsqueda de empresas...',
    category: 'application',
    order: 2,
    isActive: true,
    createdAt: '2024-01-02'
  },
  {
    id: '3',
    title: 'Paso 3: Proceso de Entrevista',
    description: 'Cómo prepararte para las entrevistas de trabajo',
    content: 'Contenido sobre entrevistas...',
    category: 'internship',
    order: 3,
    isActive: true,
    createdAt: '2024-01-03'
  }
];

export const mockAppointments: Appointment[] = [
  {
    id: '1',
    studentId: '123456',
    companyId: '1',
    date: '2024-02-15',
    time: '10:00',
    type: 'interview',
    status: 'confirmed',
    notes: 'Entrevista inicial para prácticas de desarrollo',
    createdAt: '2024-02-01'
  },
  {
    id: '2',
    studentId: '123456',
    companyId: '2',
    date: '2024-02-20',
    time: '14:30',
    type: 'meeting',
    status: 'pending',
    notes: 'Reunión informativa sobre oportunidades',
    createdAt: '2024-02-05'
  }
];

export const mockUsers: User[] = [
  {
    id: '1',
    studentId: '123456',
    name: 'Juan Pérez García',
    email: 'juan.perez@udlap.mx',
    career: 'Ingeniería en Sistemas Computacionales',
    semester: 8,
    createdAt: '2024-01-01'
  },
  {
    id: '2',
    studentId: '987654',
    name: 'María González López',
    email: 'maria.gonzalez@udlap.mx',
    career: 'Ingeniería Industrial',
    semester: 7,
    createdAt: '2024-01-02'
  }
];

// Funciones de utilidad para la "base de datos"
export class MockDatabase {
  private static instance: MockDatabase;
  private data: {
    companies: Company[];
    documents: Document[];
    guides: Guide[];
    appointments: Appointment[];
    users: User[];
  };

  private constructor() {
    this.data = {
      companies: [...mockCompanies],
      documents: [...mockDocuments],
      guides: [...mockGuides],
      appointments: [...mockAppointments],
      users: [...mockUsers]
    };
  }

  static getInstance(): MockDatabase {
    if (!MockDatabase.instance) {
      MockDatabase.instance = new MockDatabase();
    }
    return MockDatabase.instance;
  }

  // Companies
  getCompanies(): Company[] {
    return this.data.companies;
  }

  addCompany(company: Omit<Company, 'id' | 'createdAt'>): Company {
    const newCompany: Company = {
      ...company,
      id: Date.now().toString(),
      createdAt: new Date().toISOString().split('T')[0]
    };
    this.data.companies.push(newCompany);
    return newCompany;
  }

  // Documents
  getDocuments(): Document[] {
    return this.data.documents;
  }

  addDocument(document: Omit<Document, 'id' | 'uploadedAt'>): Document {
    const newDocument: Document = {
      ...document,
      id: Date.now().toString(),
      uploadedAt: new Date().toISOString().split('T')[0]
    };
    this.data.documents.push(newDocument);
    return newDocument;
  }

  // Guides
  getGuides(): Guide[] {
    return this.data.guides.sort((a, b) => a.order - b.order);
  }

  // Appointments
  getAppointments(studentId?: string): Appointment[] {
    if (studentId) {
      return this.data.appointments.filter(apt => apt.studentId === studentId);
    }
    return this.data.appointments;
  }

  addAppointment(appointment: Omit<Appointment, 'id' | 'createdAt'>): Appointment {
    const newAppointment: Appointment = {
      ...appointment,
      id: Date.now().toString(),
      createdAt: new Date().toISOString()
    };
    this.data.appointments.push(newAppointment);
    return newAppointment;
  }

  // Users
  getUserByStudentId(studentId: string): User | undefined {
    return this.data.users.find(user => user.studentId === studentId);
  }

  // Auth - simplified for demo
  authenticate(studentId: string, password: string): { success: boolean; user?: User; error?: string } {
    // For demo purposes, accept any non-empty credentials
    if (studentId && password) {
      const existingUser = this.getUserByStudentId(studentId);
      if (existingUser) {
        return { success: true, user: existingUser };
      } else {
        // Create new user for demo
        const newUser: User = {
          id: Date.now().toString(),
          studentId,
          name: `Estudiante ${studentId}`,
          email: `${studentId}@udlap.mx`,
          career: 'Ingeniería',
          semester: 1,
          createdAt: new Date().toISOString()
        };
        this.data.users.push(newUser);
        return { success: true, user: newUser };
      }
    }
    return { success: false, error: 'Credenciales inválidas' };
  }
}