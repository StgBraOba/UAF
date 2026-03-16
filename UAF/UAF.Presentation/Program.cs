using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using System.Data.Common;
using System.Text;
using UAF.Application.Interfaces;
using UAF.Application.Services;
using UAF.Infrastructure;
using UAF.Infrastructure.DataBase;
using UAF.Infrastructure.Repository;
using UAF.Infrastructure.Security;
using Microsoft.OpenApi.Models;



var builder = WebApplication.CreateBuilder(args);


// ?? Agregar CORS
builder.Services.AddCors(options =>
{
    options.AddPolicy("PermitirReact",
        policy =>
        {
            policy.WithOrigins("http://localhost:5173") // puerto donde corre React
                  .AllowAnyHeader()
                  .AllowAnyMethod();
        });
});


builder.Services.AddAuthentication(options =>
{
    options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
    options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
})
.AddJwtBearer(options =>
{
    options.TokenValidationParameters = new TokenValidationParameters
    {
        ValidateIssuer = true,
        ValidateAudience = true,
        ValidateLifetime = true,
        ValidateIssuerSigningKey = true,

        ValidIssuer = builder.Configuration["Jwt:Issuer"],
        ValidAudience = builder.Configuration["Jwt:Audience"],
        IssuerSigningKey = new SymmetricSecurityKey(
            Encoding.UTF8.GetBytes(builder.Configuration["Jwt:Key"]))
    };
});


builder.Services.AddScoped<IJwtService, JwtService>();

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle

//Cadena de conexion a la base de datos dataflow hub
var connectionstring = builder.Configuration.GetConnectionString("Default");
builder.Services.AddSingleton(new DBUniv(connectionstring!));

//Inyeccion de dependencia de Rol
builder.Services.AddScoped<IEnumarableRol, RolRepository>();
builder.Services.AddScoped<RolServices>();

//Inyeccion de dependencia de Facultad
builder.Services.AddScoped<IEnumerableFacultad, FacultadRepository>();
builder.Services.AddScoped<FacultadServices>();

//Inyeccion de dependencia de Modalidad
builder.Services.AddScoped<IEnumerableModalidad, ModalidadRepository>();
builder.Services.AddScoped<ModalidadServices>();

//Inyeccion de dependencia de Usuario
builder.Services.AddScoped<IEnumerableUsuario, UsuarioRepository>();
builder.Services.AddScoped<UsuarioServices>();

//Inyeccion de dependencia de Carrera
builder.Services.AddScoped<IEnumerableCarrera, CarreraRepository>();
builder.Services.AddScoped<CarreraServices>();

//Inyeccion de dependencia de Clase
builder.Services.AddScoped<IEnumerableAsignatura, AsignaturaRepository>();
builder.Services.AddScoped<AsignaturaServices>();

//Inyeccion de dependencia de Docente
builder.Services.AddScoped<IEnumerableDocente, DocenteRepository>();
builder.Services.AddScoped<DocenteServices>();


//Inyeccion de dependencia de Estudiante
builder.Services.AddScoped<IEnumerableEstudiante, EstudianteRepository>();
builder.Services.AddScoped<EstudianteServices>();


//Inyeccion de dependencia de Inscripcion
builder.Services.AddScoped<IEnumerableInscripcion, InscripcionRepository>();
builder.Services.AddScoped<InscripcionServices>();

//Inyeccion de dependencia de Grupo
builder.Services.AddScoped<IEnumerableGrupo, GrupoRepository>();
builder.Services.AddScoped<GrupoServices>();

//Inyeccion de dependencia de Asistencia
builder.Services.AddScoped<IEnumerableAsistencia, AsistenciaRepository>();
builder.Services.AddScoped<AsistenciaServices>();

//Inyeccion de dependencia de Calificacion
builder.Services.AddScoped<IEnumerableCalificacion, CalificacionRepository>();
builder.Services.AddScoped<CalificacionServices>();

//Inyeccion de dependencia de InscripcionDetalle
builder.Services.AddScoped<IEnumerableInscripcionDetalle, InscripcionDetalleRepository>();
builder.Services.AddScoped<InscripcionDetalleServices>();


//Inyeccion de dependencia para el log in
builder.Services.AddScoped<IAuthService, AuthService>();
builder.Services.AddScoped<IUsuarioRepository, AuthRepository>();
builder.Services.AddScoped<IJwtService, JwtService>();


builder.Services.AddEndpointsApiExplorer();
//builder.Services.AddSwaggerGen();


builder.Services.AddSwaggerGen(options =>
{
    options.SwaggerDoc("v1", new OpenApiInfo
    {
        Title = "Mi API",
        Version = "v1"
    });

    options.AddSecurityDefinition("Bearer", new OpenApiSecurityScheme
    {
        Name = "Authorization",
        Type = SecuritySchemeType.Http,
        Scheme = "bearer",
        BearerFormat = "JWT",
        In = ParameterLocation.Header,
        Description = "Escribe: Bearer {tu token}"
    });

    options.AddSecurityRequirement(new OpenApiSecurityRequirement
    {
        {
            new OpenApiSecurityScheme
            {
                Reference = new OpenApiReference
                {
                    Type = ReferenceType.SecurityScheme,
                    Id = "Bearer"
                }
            },
            new string[] {}
        }
    });
});





var app = builder.Build();

// ?? Usar CORS (ANTES de MapControllers)
app.UseCors("PermitirReact");

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();

}

builder.Services.AddAuthorization();

app.UseAuthentication();

app.UseAuthorization();

app.MapControllers();

app.Run();



