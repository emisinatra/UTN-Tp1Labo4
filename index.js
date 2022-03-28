const $ = document;

const main = async () => {
  const $tableBody = $.querySelector("#table-body");

  const response = await fetch(
    "http://168.194.207.98:8081/tp/lista.php?action=BUSCAR"
  );

  const data = await response.json();

  data.forEach((item) => {
    const $fila = $.createElement("tr");

    const bloqueado = item.bloqueado === "Y" ? true : false;

    $fila.style.backgroundColor = bloqueado ? "#fd9f8b" : "#cef8c6";
    $fila.style.color = bloqueado ? "white" : "black";

    const $celdaId = $.createElement("td");
    $celdaId.innerText = item.id;
    const $celdaUsuario = $.createElement("td");
    $celdaUsuario.innerText = item.usuario;
    const $celdaBloqueado = $.createElement("td");
    $celdaBloqueado.innerText = item.bloqueado;
    const $celdaNombre = $.createElement("td");
    $celdaNombre.innerText = item.nombre;
    const $celdaApellido = $.createElement("td");
    $celdaApellido.innerText = item.apellido;

    const $celdaBloquear = $.createElement("td");
    const $btnBloquear = $.createElement("button");
    $btnBloquear.innerText = "Bloquear";

    const bloquearPorId = async () => {
      await fetch(
        `http://168.194.207.98:8081/tp/lista.php?action=BLOQUEAR&idUser=${item.id}&estado=Y`
      );

      window.location.reload();
    };

    $btnBloquear.addEventListener("click", (event) => {
      bloquearPorId();
    });
    $celdaBloquear.appendChild($btnBloquear);

    const $celdaDesbloquear = $.createElement("td");
    const $btnDesbloquear = $.createElement("button");
    $btnDesbloquear.innerText = "Desbloquear";

    const desbloquearPorId = async () => {
      await fetch(
        `http://168.194.207.98:8081/tp/lista.php?action=BLOQUEAR&idUser=${item.id}&estado=N`
      );

      window.location.reload();
    };

    $btnDesbloquear.addEventListener("click", (event) => {
      desbloquearPorId();
    });
    $celdaDesbloquear.appendChild($btnDesbloquear);

    appendChilds($fila, [
      $celdaId,
      $celdaUsuario,
      $celdaBloqueado,
      $celdaNombre,
      $celdaApellido,
      $celdaBloquear,
      $celdaDesbloquear,
    ]);

    $tableBody.appendChild($fila);
  });
};

const appendChilds = (parent, childs) => {
  for (let i = 0; i < childs.length; i++) {
    parent.appendChild(childs[i]);
  }
};

main();
