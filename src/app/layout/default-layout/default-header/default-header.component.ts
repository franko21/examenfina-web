import { Component, computed, DestroyRef, inject, Input, OnInit } from '@angular/core';
import {
  AvatarComponent,
  BadgeComponent,
  BreadcrumbRouterComponent,
  ColorModeService,
  ContainerComponent,
  DropdownComponent,
  DropdownDividerDirective,
  DropdownHeaderDirective,
  DropdownItemDirective,
  DropdownMenuDirective,
  DropdownToggleDirective,
  HeaderComponent,
  HeaderNavComponent,
  HeaderTogglerDirective,
  NavItemComponent,
  NavLinkDirective,
  ProgressBarDirective,
  ProgressComponent,
  SidebarToggleDirective,
  TextColorDirective,
  CardBodyComponent,
  CardComponent,
  ThemeDirective,
  
} from '@coreui/angular';
import { NgStyle, NgTemplateOutlet } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink, RouterLinkActive } from '@angular/router';
import { IconDirective } from '@coreui/icons-angular';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { delay, filter, map, tap } from 'rxjs/operators';
import { environment } from 'src/enviroments/environment';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { Configuracion } from 'src/app/model/configuracion';
import { Alerta } from 'src/app/model/alerta';
import { AlertaService } from 'src/app/service/alerta.service';
import { ConfiguracionService } from 'src/app/service/configuracion.service';
import { Prestamo } from 'src/app/model/prestamo';
import { PrestamoService } from 'src/app/service/prestamo.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-default-header',
  templateUrl: './default-header.component.html',
  styleUrl:'./default-header.component.scss',
  providers:[ConfiguracionService,AlertaService,PrestamoService],
  standalone: true,
  imports: [ContainerComponent,ReactiveFormsModule,FormsModule,CommonModule,CardBodyComponent,CardComponent, HeaderTogglerDirective, SidebarToggleDirective, IconDirective, HeaderNavComponent, NavItemComponent, NavLinkDirective, RouterLink, RouterLinkActive, NgTemplateOutlet, BreadcrumbRouterComponent, ThemeDirective, DropdownComponent, DropdownToggleDirective, TextColorDirective, AvatarComponent, DropdownMenuDirective, DropdownHeaderDirective, DropdownItemDirective, BadgeComponent, DropdownDividerDirective, ProgressBarDirective, ProgressComponent, NgStyle,HttpClientModule]

})
export class DefaultHeaderComponent extends HeaderComponent implements OnInit {

  readonly #activatedRoute: ActivatedRoute = inject(ActivatedRoute);
  readonly #colorModeService = inject(ColorModeService);
  readonly colorMode = this.#colorModeService.colorMode;
  readonly #destroyRef: DestroyRef = inject(DestroyRef);
  
  public configuracion:Configuracion=new Configuracion();
  public hora: number=0;
  public minuto: number=0;
  public segundo: number=0;
  public recop :number=0;


  prestamos: Prestamo[] = [];
  alertas:Alerta[]=[];
  configuraciones:Configuracion[]=[];

  showTable: boolean = false;
  toggleView() {
    this.showTable = !this.showTable;
    console.log("se esta accionando el boton editar");
  }
  
  mostrarconfig() {
    this.serconfig.listar().subscribe(
      configuraciones => {
        if (this.configuraciones) {
          this.configuraciones = configuraciones;
          this.configuracion = configuraciones[0];
        }
        console.log('Configuraciones:', this.configuraciones);
      },
      error => {
        console.error('Error al listar configuraciones:', error);
      }
    );


  }

 convertirASegundos(): number {
  return (this.hora * 3600) + (this.minuto * 60) + this.segundo;
}

  desplegarcrud() {
    this.toggleView();
    this.resetForm();
  }


  crud_close():void{
    this.showTable=false;
    this.mostrarconfig();


  }
  actualizartiempo() {

   const tiempo :number=this.convertirASegundos();
    if (tiempo==0) {
      Swal.fire({
        icon: 'question',
        title: 'Valor incorrecto',     
        confirmButtonText: 'OK'
      });
    } else {
      this.configuracion.tiempoRespuesta = this.convertirASegundos();
      this.serconfig.crear(this.configuracion).subscribe(
        response => {
          Swal.fire({
            icon: 'success',
            title: 'Tiempo de Respuesta Actualizado',
            text: 'La configuración ha sido actualizada correctamente.',
            confirmButtonText: 'OK'
          });
          this.showTable = false; // Ocultar el formulario después de guardar
          this.resetForm()
        },
  
        error => {
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Ocurrió un error al actualizar la configuración.',
            confirmButtonText: 'OK'
          });
        }
      );

    }

    
  }

  resetForm() {
    this.hora = 0;
    this.minuto = 0;
    this.segundo = 0;
  }


  

  






















  //////////////////////////////////////////

  readonly colorModes = [
    { name: 'light', text: 'Light', icon: 'cilSun' },
    { name: 'dark', text: 'Dark', icon: 'cilMoon' },
    { name: 'auto', text: 'Auto', icon: 'cilContrast' }
  ];

  readonly icons = computed(() => {
    const currentMode = this.colorMode();
    return this.colorModes.find(mode=> mode.name === currentMode)?.icon ?? 'cilSun';
  });

  constructor(
    private router: Router,
    private serconfig: ConfiguracionService,
    private seralerta: AlertaService,
    private serpres: PrestamoService
  ) {
    super();
    this.#colorModeService.localStorageItemName.set('coreui-free-angular-admin-template-theme-default');
    this.#colorModeService.eventName.set('ColorSchemeChange');

    this.#activatedRoute.queryParams
      .pipe(
        delay(1),
        map(params => <string>params['theme']?.match(/^[A-Za-z0-9\s]+/)?.[0]),
        filter(theme => ['dark', 'light', 'auto'].includes(theme)),
        tap(theme => {
          this.colorMode.set(theme);
        }),
        takeUntilDestroyed(this.#destroyRef)
      )
      .subscribe();
  }
  ngOnInit(): void {
  
  }


  @Input() sidebarId: string = 'sidebar1';

  public newMessages = [
    {
      id: 0,
      from: 'Jessica Williams',
      avatar: '7.jpg',
      status: 'success',
      title: 'Urgent: System Maintenance Tonight',
      time: 'Just now',
      link: 'apps/email/inbox/message',
      message: 'Attention team, we\'ll be conducting critical system maintenance tonight from 10 PM to 2 AM. Plan accordingly...'
    },
    {
      id: 1,
      from: 'Richard Johnson',
      avatar: '6.jpg',
      status: 'warning',
      title: 'Project Update: Milestone Achieved',
      time: '5 minutes ago',
      link: 'apps/email/inbox/message',
      message: 'Kudos on hitting sales targets last quarter! Let\'s keep the momentum. New goals, new victories ahead...'
    },
    {
      id: 2,
      from: 'Angela Rodriguez',
      avatar: '5.jpg',
      status: 'danger',
      title: 'Social Media Campaign Launch',
      time: '1:52 PM',
      link: 'apps/email/inbox/message',
      message: 'Exciting news! Our new social media campaign goes live tomorrow. Brace yourselves for engagement...'
    },
    {
      id: 3,
      from: 'Jane Lewis',
      avatar: '4.jpg',
      status: 'info',
      title: 'Inventory Checkpoint',
      time: '4:03 AM',
      link: 'apps/email/inbox/message',
      message: 'Team, it\'s time for our monthly inventory check. Accurate counts ensure smooth operations. Let\'s nail it...'
    },
    {
      id: 3,
      from: 'Ryan Miller',
      avatar: '4.jpg',
      status: 'info',
      title: 'Customer Feedback Results',
      time: '3 days ago',
      link: 'apps/email/inbox/message',
      message: 'Our latest customer feedback is in. Let\'s analyze and discuss improvements for an even better service...'
    }
  ];

  public newNotifications = [
    { id: 0, title: 'New user registered', icon: 'cilUserFollow', color: 'success' },
    { id: 1, title: 'User deleted', icon: 'cilUserUnfollow', color: 'danger' },
    { id: 2, title: 'Sales report is ready', icon: 'cilChartPie', color: 'info' },
    { id: 3, title: 'New client', icon: 'cilBasket', color: 'primary' },
    { id: 4, title: 'Server overloaded', icon: 'cilSpeedometer', color: 'warning' }
  ];

  public newStatus = [
    { id: 0, title: 'CPU Usage', value: 25, color: 'info', details: '348 Processes. 1/4 Cores.' },
    { id: 1, title: 'Memory Usage', value: 70, color: 'warning', details: '11444GB/16384MB' },
    { id: 2, title: 'SSD 1 Usage', value: 90, color: 'danger', details: '243GB/256GB' }
  ];

  public newTasks = [
    { id: 0, title: 'Upgrade NPM', value: 0, color: 'info' },
    { id: 1, title: 'ReactJS Version', value: 25, color: 'danger' },
    { id: 2, title: 'VueJS Version', value: 50, color: 'warning' },
    { id: 3, title: 'Add new layouts', value: 75, color: 'info' },
    { id: 4, title: 'Angular Version', value: 100, color: 'success' }
  ];

  public logout(){
    environment.islogged=false;
    this.router.navigate(['/login']);
  }

}
