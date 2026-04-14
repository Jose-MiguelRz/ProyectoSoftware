import { useState } from "react";
import { User, GraduationCap, AlertCircle, CheckCircle, Shield } from "lucide-react";
import { Button } from "./button";
import { Card } from "./card";
import { useStudentProfile } from "./student-profile-provider";
import { toast } from "sonner";

export function ProfileSettings() {
  const { profile, updateProfile, meetsInternshipRequirements } = useStudentProfile();
  const [isEditing, setIsEditing] = useState(false);
  const [editedProfile, setEditedProfile] = useState(profile);

  const requirements = meetsInternshipRequirements();
  const creditsPercentage = (profile.creditsCompleted / profile.totalCredits) * 100;

  const handleSave = () => {
    updateProfile(editedProfile);
    setIsEditing(false);
    toast.success("Perfil actualizado", {
      description: "Tus cambios han sido guardados correctamente."
    });
  };

  const handleCancel = () => {
    setEditedProfile(profile);
    setIsEditing(false);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div>
        <h1 className="text-3xl mb-2">Mi Perfil</h1>
        <p className="text-muted-foreground">
          Administra tu información académica y personal
        </p>
      </div>

      {/* Status Overview */}
      <Card>
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
              <User className="text-primary" size={24} />
            </div>
            <div>
              <h2 className="text-xl">{profile.name}</h2>
              <p className="text-sm text-muted-foreground">{profile.studentId}</p>
            </div>
          </div>
          {requirements.eligible ? (
            <div className="flex items-center gap-2 px-3 py-1.5 bg-secondary/10 text-secondary rounded-full">
              <CheckCircle size={16} />
              <span className="text-sm font-medium">Elegible para Prácticas</span>
            </div>
          ) : (
            <div className="flex items-center gap-2 px-3 py-1.5 bg-amber-100 text-amber-800 rounded-full">
              <AlertCircle size={16} />
              <span className="text-sm font-medium">Requisitos Incompletos</span>
            </div>
          )}
        </div>

        <div className="grid sm:grid-cols-2 gap-4 pt-4 border-t">
          <div>
            <p className="text-sm text-muted-foreground mb-1">Carrera</p>
            <p className="font-medium">{profile.major}</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground mb-1">Semestre Actual</p>
            <p className="font-medium">{profile.currentSemester}</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground mb-1">Promedio</p>
            <div className="flex items-center gap-2">
              <p className={`font-medium ${profile.gpa >= 7.0 ? "text-secondary" : "text-destructive"}`}>
                {profile.gpa.toFixed(1)}
              </p>
              {profile.gpa >= 7.0 ? (
                <CheckCircle size={16} className="text-secondary" />
              ) : (
                <AlertCircle size={16} className="text-destructive" />
              )}
            </div>
          </div>
          <div>
            <p className="text-sm text-muted-foreground mb-1">Créditos Completados</p>
            <div className="flex items-center gap-2">
              <p className={`font-medium ${creditsPercentage >= 70 ? "text-secondary" : "text-destructive"}`}>
                {profile.creditsCompleted}/{profile.totalCredits} ({creditsPercentage.toFixed(0)}%)
              </p>
              {creditsPercentage >= 70 ? (
                <CheckCircle size={16} className="text-secondary" />
              ) : (
                <AlertCircle size={16} className="text-destructive" />
              )}
            </div>
          </div>
        </div>
      </Card>

      {/* Requirements Checklist */}
      <Card>
        <div className="flex items-center gap-2 mb-4">
          <GraduationCap className="text-primary" size={20} />
          <h2 className="text-xl">Requisitos para Prácticas</h2>
        </div>
        
        <div className="space-y-3">
          <div className={`flex items-center gap-3 p-3 rounded-lg ${
            creditsPercentage >= 70 ? "bg-secondary/10" : "bg-gray-50"
          }`}>
            {creditsPercentage >= 70 ? (
              <CheckCircle className="text-secondary flex-shrink-0" size={20} />
            ) : (
              <AlertCircle className="text-muted-foreground flex-shrink-0" size={20} />
            )}
            <div>
              <p className="text-sm font-medium">Mínimo 70% de créditos</p>
              <p className="text-xs text-muted-foreground">
                {creditsPercentage >= 70 
                  ? "✓ Cumplido" 
                  : `Necesitas ${Math.ceil((profile.totalCredits * 0.7) - profile.creditsCompleted)} créditos más`}
              </p>
            </div>
          </div>

          <div className={`flex items-center gap-3 p-3 rounded-lg ${
            profile.gpa >= 7.0 ? "bg-secondary/10" : "bg-gray-50"
          }`}>
            {profile.gpa >= 7.0 ? (
              <CheckCircle className="text-secondary flex-shrink-0" size={20} />
            ) : (
              <AlertCircle className="text-muted-foreground flex-shrink-0" size={20} />
            )}
            <div>
              <p className="text-sm font-medium">Promedio mínimo 7.0</p>
              <p className="text-xs text-muted-foreground">
                {profile.gpa >= 7.0 
                  ? "✓ Cumplido" 
                  : `Tu promedio actual es ${profile.gpa.toFixed(1)}`}
              </p>
            </div>
          </div>

          <div className={`flex items-center gap-3 p-3 rounded-lg ${
            profile.hasActiveInsurance ? "bg-secondary/10" : "bg-gray-50"
          }`}>
            {profile.hasActiveInsurance ? (
              <CheckCircle className="text-secondary flex-shrink-0" size={20} />
            ) : (
              <AlertCircle className="text-muted-foreground flex-shrink-0" size={20} />
            )}
            <div>
              <p className="text-sm font-medium">Seguro escolar activo</p>
              <p className="text-xs text-muted-foreground">
                {profile.hasActiveInsurance ? "✓ Cumplido" : "Debes activar tu seguro"}
              </p>
            </div>
          </div>

          <div className={`flex items-center gap-3 p-3 rounded-lg ${
            profile.hasCompletedRequiredCourses ? "bg-secondary/10" : "bg-gray-50"
          }`}>
            {profile.hasCompletedRequiredCourses ? (
              <CheckCircle className="text-secondary flex-shrink-0" size={20} />
            ) : (
              <AlertCircle className="text-muted-foreground flex-shrink-0" size={20} />
            )}
            <div>
              <p className="text-sm font-medium">Cursos obligatorios completados</p>
              <p className="text-xs text-muted-foreground">
                {profile.hasCompletedRequiredCourses ? "✓ Cumplido" : "Faltan cursos por completar"}
              </p>
            </div>
          </div>
        </div>
      </Card>

      {/* Edit Profile (Demo) */}
      <Card>
        <div className="flex items-center gap-2 mb-4">
          <Shield className="text-primary" size={20} />
          <h2 className="text-xl">Información Personal</h2>
        </div>

        <div className="space-y-4">
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">Correo Institucional</label>
              <input
                type="email"
                value={isEditing ? editedProfile.email : profile.email}
                onChange={(e) => setEditedProfile({...editedProfile, email: e.target.value})}
                disabled={!isEditing}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary disabled:bg-gray-100"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Teléfono</label>
              <input
                type="tel"
                value={isEditing ? editedProfile.phone : profile.phone}
                onChange={(e) => setEditedProfile({...editedProfile, phone: e.target.value})}
                disabled={!isEditing}
                placeholder="222 123 4567"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary disabled:bg-gray-100"
              />
            </div>
          </div>

          <div className="flex gap-3 pt-4 border-t">
            {isEditing ? (
              <>
                <Button variant="outline" onClick={handleCancel} className="flex-1">
                  Cancelar
                </Button>
                <Button variant="primary" onClick={handleSave} className="flex-1">
                  Guardar Cambios
                </Button>
              </>
            ) : (
              <Button variant="primary" onClick={() => setIsEditing(true)} className="w-full">
                Editar Información
              </Button>
            )}
          </div>
        </div>
      </Card>

      {/* Demo Note */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-sm text-blue-800">
        <p className="font-medium mb-1">Nota de Demostración</p>
        <p>
          Esta es una interfaz de demostración. En producción, los datos académicos (créditos, promedio, etc.) 
          se sincronizarían automáticamente con el sistema institucional.
        </p>
      </div>
    </div>
  );
}
