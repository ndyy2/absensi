export interface Class {
  id: string;
  name: string;
  absensiSummary: { Masuk: number; Ijin: number; Alpha: number; Sakit: number };
}

export interface StudentAttendance {
  id: string;
  name: string;
  status: string;
  date: string;
  suratUrl: string | null;
}

export interface AttendanceDetail {
  studentName: string;
  status: string;
  date: string;
  suratUrl: string | null;
  notes: string;
}

export interface Theme {
  default: string;
  switchable: boolean;
  colors: {
    [key: string]: {
      backgroundGradient: string;
      background: string;
      text: string;
      navbarGradient: string;
      button: {
        background: string;
        hoverBackground: string;
        text: string;
        gradient: string;
      };
    };
  };
  animation: {
    [key: string]: {
      initial: any;
      animate: any;
      exit?: any;
      transition: any;
    };
  };
}
