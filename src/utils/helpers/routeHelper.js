import authMiddleware from "#middlewares/authMiddleware.js";

/**
 * Registra dinámicamente las rutas en el enrutador especificado.
 *
 * @async
 * @function useRoute
 * @param {Array<Object>} routes - Lista de rutas a registrar.
 * @param {string} routes[].name - Nombre del módulo de la ruta.
 * @param {boolean} routes[].is_protected - Indica si la ruta requiere autenticación.
 * @param {Object} router - Instancia del enrutador donde se registrarán las rutas.
 * @returns {Promise<void>} - No retorna valor, pero registra las rutas en el router.
 */
export async function useRoute(routes, router) {
  for (const route of routes) {
    try {
      const { name, path, is_protected } = route;
      let importName = name.toLowerCase() + "Router";
      console.log(`[useRoute] Procesando módulo: ${name}, Protegido: ${is_protected}`);
      // Importa dinámicamente el módulo de la ruta
      const module = await import(`#modules/${name}/Router.js`);
      const routePath = `/${path}`;
      const routeHandler = module[importName];

      if (!routeHandler) {
        console.error(`Error: No se encontró '${importName}' en #modules/${name}/Router.js`);
        continue;
      }

      // Aplica middleware de autenticación si la ruta es protegida
      if (is_protected) {
        console.log(`[useRoute] Montando router para ${name} en ${routePath} CON authMiddleware.`);
        router.use(routePath, authMiddleware, routeHandler);
      } else {
        console.log(`[useRoute] Montando router para ${name} en ${routePath} SIN authMiddleware.`);
        router.use(routePath, routeHandler);
      }
    } catch (error) {
      console.error(`Error al cargar la ruta '${route.name}':`, error);
    }
  }
}

