import  moduleAlias from 'module-alias'

moduleAlias.addAliases({
    '@root': __dirname,
    '@controllers': `${__dirname}/app/controllers`,
    '@models': `${__dirname}/app/models`,
    '@services': `${__dirname}/app/services`,
    '@middlewares': `${__dirname}/app/middlewares`,
    '@validators': `${__dirname}/app/validators`,
    '@libs': `${__dirname}/libs`,
    '@config': `${__dirname}/config`,
    '@routes':`${__dirname}/routes`
    
})