import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { ServiceComponent } from './pages/service/service.component';
import { RegistroComponent } from './pages/registro/registro.component';
import { GerirServicosComponent } from './pages/administrativo/gerir-servicos/gerir-servicos.component';
import { AdminstrativoServiceFormComponent } from './pages/adminstrativo-service-form/adminstrativo-service-form.component';
import { AdminstrativoDeleteProfessionalComponent } from './pages/adminstrativo-delete-professional/adminstrativo-delete-professional.component';
import { AdministrativoServicoDelEditComponent } from './pages/administrativo-servico-del-edit/administrativo-servico-del-edit.component';
import { AdministrativoDashboardComponent } from './pages/administrativo-dashboard/administrativo-dashboard.component';
import { AdministradorDashboardComponent } from './pages/administrador-dashboard/administrador-dashboard.component';
import { ProfissionalDashboardComponent } from './pages/profissional-dashboard/profissional-dashboard.component';
import { EntrarComponent } from './pages/entrar/entrar.component';

export const routes: Routes = [
  { path: '', component: HomeComponent},
  { path: 'services', component: ServiceComponent },//Marcação
  { path: 'entrar', component: EntrarComponent },
  { path: 'administrativo', component: GerirServicosComponent },//Form de Profissionais
  { path: 'administradorDashboard', component:AdministradorDashboardComponent},//dasboard do Administrador
  { path: 'administrativeDashboard', component:AdministrativoDashboardComponent},//dashboard do Administrativo
  { path: 'administrativoServiceRem',component:AdministrativoServicoDelEditComponent},//remover Serviço administrativo
  { path: 'administrativoRemover',component:AdminstrativoDeleteProfessionalComponent},//remover Funcionarios
  { path: 'administrativoServiceAdd',component:AdminstrativoServiceFormComponent },//adicionar Serviço
  { path: 'profissional',component:ProfissionalDashboardComponent}//dashboard do profissional
];
