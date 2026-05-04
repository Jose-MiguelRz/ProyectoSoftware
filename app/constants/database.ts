// Base de datos mockup para la aplicación
export interface Company {
  id: string;
  name: string;
  description: string;
  location: string;
  industry: string;
  industryEn?: string;
  contactEmail: string;
  website?: string;
  logo?: string;
  paid?: boolean;
  positions?: number;
  hours?: string;
  hoursEn?: string;
  locationEn?: string;
  descriptionEn?: string;
  isActive: boolean;
  createdAt: string;
}

export interface Guide {
  id: string;
  title: string;
  description: string;
  content: string;
  category: 'application' | 'internship' | 'general';
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
    descriptionEn: 'Leading educational institution in Mexico specializing in engineering and technology.',
    location: 'Monterrey, NL',
    locationEn: 'Monterrey, NL',
    industry: 'Educación',
    industryEn: 'Education',
    contactEmail: 'practicas@tec.mx',
    website: 'https://www.tec.mx',
    paid: false,
    positions: 5,
    hours: '30 hrs/semana',
    hoursEn: '30 hrs/week',
    isActive: true,
    createdAt: '2024-01-15'
  },
  {
    id: '2',
    name: 'CEMEX',
    description: 'Empresa multinacional mexicana líder en la industria cementera y de construcción.',
    descriptionEn: 'Leading Mexican multinational in the cement and construction industry.',
    location: 'Monterrey, NL',
    locationEn: 'Monterrey, NL',
    industry: 'Construcción',
    industryEn: 'Construction',
    contactEmail: 'talento@cemex.com',
    website: 'https://www.cemex.com',
    paid: true,
    positions: 3,
    hours: '40 hrs/semana',
    hoursEn: '40 hrs/week',
    isActive: true,
    createdAt: '2024-01-20'
  },
  {
    id: '3',
    name: 'BBVA México',
    description: 'Banco líder en México ofreciendo servicios financieros innovadores.',
    descriptionEn: 'Leading bank in Mexico offering innovative financial services.',
    location: 'Ciudad de México',
    locationEn: 'Mexico City',
    industry: 'Finanzas',
    industryEn: 'Finance',
    contactEmail: 'practicas@bbva.mx',
    website: 'https://www.bbva.mx',
    paid: true,
    positions: 2,
    hours: '40 hrs/semana',
    hoursEn: '40 hrs/week',
    isActive: true,
    createdAt: '2024-01-25'
  },
  {
    id: '4',
    name: 'Grupo Azucarero',
    description: 'Empresa líder en la producción y distribución de azúcar y productos derivados con presencia en Latinoamérica.',
    descriptionEn: 'Leading company in sugar production and distribution with presence across Latin America.',
    location: 'Puebla, PUE',
    locationEn: 'Puebla, PUE',
    industry: 'Agronegocios',
    industryEn: 'Agribusiness',
    contactEmail: 'recursoshumanos@grupoazucarero.com',
    website: 'https://www.grupoazucarero.com',
    paid: true,
    positions: 4,
    hours: '40 hrs/semana',
    hoursEn: '40 hrs/week',
    isActive: true,
    createdAt: '2024-02-01'
  },
  {
    id: '5',
    name: 'Volkswagen México',
    description: 'Fabricante de vehículos de clase mundial con instalaciones de manufactura y centros de investigación.',
    descriptionEn: 'World-class vehicle manufacturer with manufacturing facilities and research centers.',
    location: 'Puebla, PUE',
    locationEn: 'Puebla, PUE',
    industry: 'Manufactura Automotriz',
    industryEn: 'Automotive Manufacturing',
    contactEmail: 'practicas@volkswagen.mx',
    website: 'https://www.volkswagen.mx',
    paid: true,
    positions: 6,
    hours: '40 hrs/semana',
    hoursEn: '40 hrs/week',
    isActive: true,
    createdAt: '2024-02-05'
  },
  {
    id: '6',
    name: 'Grupo Farmacias del Dr. Ahorro',
    description: 'Cadena farmacéutica dedicada a ofrecer medicamentos y productos de salud a precios accesibles.',
    descriptionEn: 'Pharmacy chain dedicated to offering medicines and health products at affordable prices.',
    location: 'México City, CDMX',
    locationEn: 'Mexico City, CDMX',
    industry: 'Farmacéutica y Salud',
    industryEn: 'Pharmaceuticals and Health',
    contactEmail: 'talento@farmaciasahorro.com',
    website: 'https://www.farmaciasahorro.com',
    paid: false,
    positions: 3,
    hours: '20 hrs/semana',
    hoursEn: '20 hrs/week',
    isActive: true,
    createdAt: '2024-02-10'
  },
  {
    id: '7',
    name: 'Consultoría Digital Solutions',
    description: 'Empresa especializada en transformación digital, desarrollo de software y consultoría tecnológica.',
    descriptionEn: 'Company specialized in digital transformation, software development and technology consulting.',
    location: 'Guadalajara, JAL',
    locationEn: 'Guadalajara, JAL',
    industry: 'Tecnología y Software',
    industryEn: 'Technology and Software',
    contactEmail: 'practicas@digitalsolutions.mx',
    website: 'https://www.digitalsolutions.mx',
    paid: true,
    positions: 5,
    hours: '40 hrs/semana',
    hoursEn: '40 hrs/week',
    isActive: true,
    createdAt: '2024-02-15'
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
    guides: Guide[];
    appointments: Appointment[];
    users: User[];
  };

  private constructor() {
    this.data = {
      companies: [...mockCompanies],
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