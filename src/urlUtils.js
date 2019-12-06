export const urls = {
    
    dataProf: { name: 'Professores', path:'/dataprof'},
    dataAluno: { name: 'Alunos', path:'/dataaluno'},
    dataDisc: { name: 'Turmas', path:'/datadisc'},
    
};

export const privateUrls = {
    home: { name: 'Inicio', path:'/'},
    addProf:  { name: 'Adicionar Professor',  path:'/addprof'},
    editProf: { 
        name: 'Editar Professor',
        path:'/editprof/:id',
        pathWithouParam:'/editprof/'},
    addAluno:  { name: 'Adicionar Aluno',  path:'/addaluno'},
    editAluno: { 
        name: 'Editar Aluno',
        path:'/editaluno/:id',
        pathWithouParam:'/editaluno/'},
    addDisc:  { name: 'Adicionar Turma',  path:'/adddisc'},
    editDisc: { 
        name: 'Editar Turma',
        path:'/editdisc/:id',
        pathWithouParam:'/editdisc/'},
    login: { name: 'Login', path:'/login'},
};