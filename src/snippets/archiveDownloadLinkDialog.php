<button class="d-none" data-toggle="modal" data-target="#archiveDownloadLinkDialog" id="archiveDownloadLinkDialog-open"></button>
<div class="modal fade" id="archiveDownloadLinkDialog" tabindex="-1" role="dialog" aria-hidden="true">
  <div class="modal-dialog modal-dialog-scrollable">
    <div class="modal-content">
      <div class="modal-header">
        <h6 class="modal-title mf-break-all">Váš archiv je připraven!</h6>
      </div>
      <div class="modal-body">
        Váš archiv obsahující <b id="archiveDownloadLinkDialog-itemDesc"></b> byl úspěšně připraven!
        <br>
        <div class="mt-4 mb-3 text-center">
          <a id="archiveDownloadLinkDialog-link" class="btn btn-success font-weight-bold mf-filedetails-btn-lg text-center" style="height: 112px;" href="" target="_blank" download><img class="mt-2 mb-2" src="img/download.png"><br>Stáhnout archiv</a>
        </div>
      </div>
      <div class="modal-footer">
        <button class="btn btn-danger" data-dismiss="modal">Zavřít</button>
      </div>
    </div>
  </div>
</div>
