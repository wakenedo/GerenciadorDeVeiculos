import StatsDashboard from "../AdminInterface/StatsDashboard";

const HomeInterface = () => {
  return (
    <div className="lg:flex">
      <div className="flex-col  w-fit">
        <div className="bg-blue-100 p-6 rounded-xl shadow-lg mt-2 w-fit">
          <h1 className="text-2xl font-bold  text-blue-800 text-left">
            Bem Vindo !
          </h1>
          <div className="mt-2 max-w-2xl text-left">
            <span className="text-blue-600">
              Essa é a aplicação desenvolvida para os trabalhos realcionados a
              matéria de computação em nuvem. Você pode navegar pelas diferentes
              seções para gerenciar as entidades a partir da interface de
              administração.
            </span>
          </div>
        </div>
        <div className="bg-slate-200 p-6 rounded-xl shadow-lg mt-2 w-fit">
          <h1 className="text-2xl font-bold text-slate-600 text-left">
            Conexão e Provedores de Núvem
          </h1>
          <div className="mt-2 max-w-2xl text-left">
            <span className="text-slate-500">
              A aplicação foi desenvolvida usando o React.js, Tailwind CSS e
              Inclui uma API para lidar com as chamadas ao Banco de Dados, que
              está hospedado na Microsoft Azure
            </span>
          </div>
        </div>
      </div>
      <StatsDashboard />
    </div>
  );
};

export default HomeInterface;
