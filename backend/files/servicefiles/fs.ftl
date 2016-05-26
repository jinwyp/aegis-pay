<!DOCTYPE html>
<!-- saved from url=(0047)https://nodejs.org/docs/latest-v5.x/api/fs.html -->
<html lang="en"><head><meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
  
  <title>File System Node.js v5.11.1 Manual &amp; Documentation</title>
  <link rel="stylesheet" href="./fs.ftl_files/css">
  <link rel="stylesheet" href="./fs.ftl_files/style.css">
  <link rel="stylesheet" href="./fs.ftl_files/sh.css">
  <link rel="canonical" href="https://nodejs.org/api/fs.html">
<style type="text/css"></style></head>
<body class="alt apidoc" id="api-section-fs">
  <div id="content" class="clearfix">
    <div id="column2" class="interior">
      <div id="intro" class="interior">
        <a href="https://nodejs.org/" title="Go back to the home page">
          Node.js (1)
        </a>
      </div>
      <ul>
<li><a class="nav-documentation" href="https://nodejs.org/docs/latest-v5.x/api/documentation.html">About these Docs</a></li>
<li><a class="nav-synopsis" href="https://nodejs.org/docs/latest-v5.x/api/synopsis.html">Synopsis</a></li>
<li><a class="nav-assert" href="https://nodejs.org/docs/latest-v5.x/api/assert.html">Assertion Testing</a></li>
<li><a class="nav-buffer" href="https://nodejs.org/docs/latest-v5.x/api/buffer.html">Buffer</a></li>
<li><a class="nav-addons" href="https://nodejs.org/docs/latest-v5.x/api/addons.html">C/C++ Addons</a></li>
<li><a class="nav-child_process" href="https://nodejs.org/docs/latest-v5.x/api/child_process.html">Child Processes</a></li>
<li><a class="nav-cluster" href="https://nodejs.org/docs/latest-v5.x/api/cluster.html">Cluster</a></li>
<li><a class="nav-cli" href="https://nodejs.org/docs/latest-v5.x/api/cli.html">Command Line Options</a></li>
<li><a class="nav-console" href="https://nodejs.org/docs/latest-v5.x/api/console.html">Console</a></li>
<li><a class="nav-crypto" href="https://nodejs.org/docs/latest-v5.x/api/crypto.html">Crypto</a></li>
<li><a class="nav-debugger" href="https://nodejs.org/docs/latest-v5.x/api/debugger.html">Debugger</a></li>
<li><a class="nav-dns" href="https://nodejs.org/docs/latest-v5.x/api/dns.html">DNS</a></li>
<li><a class="nav-domain" href="https://nodejs.org/docs/latest-v5.x/api/domain.html">Domain</a></li>
<li><a class="nav-errors" href="https://nodejs.org/docs/latest-v5.x/api/errors.html">Errors</a></li>
<li><a class="nav-events" href="https://nodejs.org/docs/latest-v5.x/api/events.html">Events</a></li>
<li><a class="nav-fs active" href="https://nodejs.org/docs/latest-v5.x/api/fs.html">File System</a></li>
<li><a class="nav-globals" href="https://nodejs.org/docs/latest-v5.x/api/globals.html">Globals</a></li>
<li><a class="nav-http" href="https://nodejs.org/docs/latest-v5.x/api/http.html">HTTP</a></li>
<li><a class="nav-https" href="https://nodejs.org/docs/latest-v5.x/api/https.html">HTTPS</a></li>
<li><a class="nav-modules" href="https://nodejs.org/docs/latest-v5.x/api/modules.html">Modules</a></li>
<li><a class="nav-net" href="https://nodejs.org/docs/latest-v5.x/api/net.html">Net</a></li>
<li><a class="nav-os" href="https://nodejs.org/docs/latest-v5.x/api/os.html">OS</a></li>
<li><a class="nav-path" href="https://nodejs.org/docs/latest-v5.x/api/path.html">Path</a></li>
<li><a class="nav-process" href="https://nodejs.org/docs/latest-v5.x/api/process.html">Process</a></li>
<li><a class="nav-punycode" href="https://nodejs.org/docs/latest-v5.x/api/punycode.html">Punycode</a></li>
<li><a class="nav-querystring" href="https://nodejs.org/docs/latest-v5.x/api/querystring.html">Query Strings</a></li>
<li><a class="nav-readline" href="https://nodejs.org/docs/latest-v5.x/api/readline.html">Readline</a></li>
<li><a class="nav-repl" href="https://nodejs.org/docs/latest-v5.x/api/repl.html">REPL</a></li>
<li><a class="nav-stream" href="https://nodejs.org/docs/latest-v5.x/api/stream.html">Stream</a></li>
<li><a class="nav-string_decoder" href="https://nodejs.org/docs/latest-v5.x/api/string_decoder.html">String Decoder</a></li>
<li><a class="nav-timers" href="https://nodejs.org/docs/latest-v5.x/api/timers.html">Timers</a></li>
<li><a class="nav-tls" href="https://nodejs.org/docs/latest-v5.x/api/tls.html">TLS/SSL</a></li>
<li><a class="nav-tty" href="https://nodejs.org/docs/latest-v5.x/api/tty.html">TTY</a></li>
<li><a class="nav-dgram" href="https://nodejs.org/docs/latest-v5.x/api/dgram.html">UDP/Datagram</a></li>
<li><a class="nav-url" href="https://nodejs.org/docs/latest-v5.x/api/url.html">URL</a></li>
<li><a class="nav-util" href="https://nodejs.org/docs/latest-v5.x/api/util.html">Utilities</a></li>
<li><a class="nav-v8" href="https://nodejs.org/docs/latest-v5.x/api/v8.html">V8</a></li>
<li><a class="nav-vm" href="https://nodejs.org/docs/latest-v5.x/api/vm.html">VM</a></li>
<li><a class="nav-zlib" href="https://nodejs.org/docs/latest-v5.x/api/zlib.html">ZLIB</a></li>
</ul>

    </div>

    <div id="column1" data-id="fs" class="interior">
      <header>
        <h1>Node.js v5.11.1 Documentation</h1>
        <div id="gtoc">
          <p>
            <a href="https://nodejs.org/docs/latest-v5.x/api/index.html" name="toc">Index</a> |
            <a href="https://nodejs.org/docs/latest-v5.x/api/all.html">View on single page</a> |
            <a href="https://nodejs.org/docs/latest-v5.x/api/fs.json">View as JSON</a>
          </p>
        </div>
        <hr>
      </header>

      <div id="toc">
        <h2>Table of Contents</h2>
        <ul>
<li><a href="https://nodejs.org/docs/latest-v5.x/api/fs.html#fs_file_system">File System</a><ul>
<li><a href="https://nodejs.org/docs/latest-v5.x/api/fs.html#fs_buffer_api">Buffer API</a></li>
<li><a href="https://nodejs.org/docs/latest-v5.x/api/fs.html#fs_class_fs_fswatcher">Class: fs.FSWatcher</a><ul>
<li><a href="https://nodejs.org/docs/latest-v5.x/api/fs.html#fs_event_change">Event: 'change'</a></li>
<li><a href="https://nodejs.org/docs/latest-v5.x/api/fs.html#fs_event_error">Event: 'error'</a></li>
<li><a href="https://nodejs.org/docs/latest-v5.x/api/fs.html#fs_watcher_close">watcher.close()</a></li>
</ul>
</li>
<li><a href="https://nodejs.org/docs/latest-v5.x/api/fs.html#fs_class_fs_readstream">Class: fs.ReadStream</a><ul>
<li><a href="https://nodejs.org/docs/latest-v5.x/api/fs.html#fs_event_open">Event: 'open'</a></li>
<li><a href="https://nodejs.org/docs/latest-v5.x/api/fs.html#fs_readstream_path">readStream.path</a></li>
</ul>
</li>
<li><a href="https://nodejs.org/docs/latest-v5.x/api/fs.html#fs_class_fs_stats">Class: fs.Stats</a><ul>
<li><a href="https://nodejs.org/docs/latest-v5.x/api/fs.html#fs_stat_time_values">Stat Time Values</a></li>
</ul>
</li>
<li><a href="https://nodejs.org/docs/latest-v5.x/api/fs.html#fs_class_fs_writestream">Class: fs.WriteStream</a><ul>
<li><a href="https://nodejs.org/docs/latest-v5.x/api/fs.html#fs_event_open_1">Event: 'open'</a></li>
<li><a href="https://nodejs.org/docs/latest-v5.x/api/fs.html#fs_writestream_byteswritten">writeStream.bytesWritten</a></li>
<li><a href="https://nodejs.org/docs/latest-v5.x/api/fs.html#fs_writestream_path">writeStream.path</a></li>
</ul>
</li>
<li><a href="https://nodejs.org/docs/latest-v5.x/api/fs.html#fs_fs_access_path_mode_callback">fs.access(path[, mode], callback)</a></li>
<li><a href="https://nodejs.org/docs/latest-v5.x/api/fs.html#fs_fs_accesssync_path_mode">fs.accessSync(path[, mode])</a></li>
<li><a href="https://nodejs.org/docs/latest-v5.x/api/fs.html#fs_fs_appendfile_file_data_options_callback">fs.appendFile(file, data[, options], callback)</a></li>
<li><a href="https://nodejs.org/docs/latest-v5.x/api/fs.html#fs_fs_appendfilesync_file_data_options">fs.appendFileSync(file, data[, options])</a></li>
<li><a href="https://nodejs.org/docs/latest-v5.x/api/fs.html#fs_fs_chmod_path_mode_callback">fs.chmod(path, mode, callback)</a></li>
<li><a href="https://nodejs.org/docs/latest-v5.x/api/fs.html#fs_fs_chmodsync_path_mode">fs.chmodSync(path, mode)</a></li>
<li><a href="https://nodejs.org/docs/latest-v5.x/api/fs.html#fs_fs_chown_path_uid_gid_callback">fs.chown(path, uid, gid, callback)</a></li>
<li><a href="https://nodejs.org/docs/latest-v5.x/api/fs.html#fs_fs_chownsync_path_uid_gid">fs.chownSync(path, uid, gid)</a></li>
<li><a href="https://nodejs.org/docs/latest-v5.x/api/fs.html#fs_fs_close_fd_callback">fs.close(fd, callback)</a></li>
<li><a href="https://nodejs.org/docs/latest-v5.x/api/fs.html#fs_fs_closesync_fd">fs.closeSync(fd)</a></li>
<li><a href="https://nodejs.org/docs/latest-v5.x/api/fs.html#fs_fs_createreadstream_path_options">fs.createReadStream(path[, options])</a></li>
<li><a href="https://nodejs.org/docs/latest-v5.x/api/fs.html#fs_fs_createwritestream_path_options">fs.createWriteStream(path[, options])</a></li>
<li><a href="https://nodejs.org/docs/latest-v5.x/api/fs.html#fs_fs_exists_path_callback">fs.exists(path, callback)</a></li>
<li><a href="https://nodejs.org/docs/latest-v5.x/api/fs.html#fs_fs_existssync_path">fs.existsSync(path)</a></li>
<li><a href="https://nodejs.org/docs/latest-v5.x/api/fs.html#fs_fs_fchmod_fd_mode_callback">fs.fchmod(fd, mode, callback)</a></li>
<li><a href="https://nodejs.org/docs/latest-v5.x/api/fs.html#fs_fs_fchmodsync_fd_mode">fs.fchmodSync(fd, mode)</a></li>
<li><a href="https://nodejs.org/docs/latest-v5.x/api/fs.html#fs_fs_fchown_fd_uid_gid_callback">fs.fchown(fd, uid, gid, callback)</a></li>
<li><a href="https://nodejs.org/docs/latest-v5.x/api/fs.html#fs_fs_fchownsync_fd_uid_gid">fs.fchownSync(fd, uid, gid)</a></li>
<li><a href="https://nodejs.org/docs/latest-v5.x/api/fs.html#fs_fs_fdatasync_fd_callback">fs.fdatasync(fd, callback)</a></li>
<li><a href="https://nodejs.org/docs/latest-v5.x/api/fs.html#fs_fs_fdatasyncsync_fd">fs.fdatasyncSync(fd)</a></li>
<li><a href="https://nodejs.org/docs/latest-v5.x/api/fs.html#fs_fs_fstat_fd_callback">fs.fstat(fd, callback)</a></li>
<li><a href="https://nodejs.org/docs/latest-v5.x/api/fs.html#fs_fs_fstatsync_fd">fs.fstatSync(fd)</a></li>
<li><a href="https://nodejs.org/docs/latest-v5.x/api/fs.html#fs_fs_fsync_fd_callback">fs.fsync(fd, callback)</a></li>
<li><a href="https://nodejs.org/docs/latest-v5.x/api/fs.html#fs_fs_fsyncsync_fd">fs.fsyncSync(fd)</a></li>
<li><a href="https://nodejs.org/docs/latest-v5.x/api/fs.html#fs_fs_ftruncate_fd_len_callback">fs.ftruncate(fd, len, callback)</a></li>
<li><a href="https://nodejs.org/docs/latest-v5.x/api/fs.html#fs_fs_ftruncatesync_fd_len">fs.ftruncateSync(fd, len)</a></li>
<li><a href="https://nodejs.org/docs/latest-v5.x/api/fs.html#fs_fs_futimes_fd_atime_mtime_callback">fs.futimes(fd, atime, mtime, callback)</a></li>
<li><a href="https://nodejs.org/docs/latest-v5.x/api/fs.html#fs_fs_futimessync_fd_atime_mtime">fs.futimesSync(fd, atime, mtime)</a></li>
<li><a href="https://nodejs.org/docs/latest-v5.x/api/fs.html#fs_fs_lchmod_path_mode_callback">fs.lchmod(path, mode, callback)</a></li>
<li><a href="https://nodejs.org/docs/latest-v5.x/api/fs.html#fs_fs_lchmodsync_path_mode">fs.lchmodSync(path, mode)</a></li>
<li><a href="https://nodejs.org/docs/latest-v5.x/api/fs.html#fs_fs_lchown_path_uid_gid_callback">fs.lchown(path, uid, gid, callback)</a></li>
<li><a href="https://nodejs.org/docs/latest-v5.x/api/fs.html#fs_fs_lchownsync_path_uid_gid">fs.lchownSync(path, uid, gid)</a></li>
<li><a href="https://nodejs.org/docs/latest-v5.x/api/fs.html#fs_fs_link_srcpath_dstpath_callback">fs.link(srcpath, dstpath, callback)</a></li>
<li><a href="https://nodejs.org/docs/latest-v5.x/api/fs.html#fs_fs_linksync_srcpath_dstpath">fs.linkSync(srcpath, dstpath)</a></li>
<li><a href="https://nodejs.org/docs/latest-v5.x/api/fs.html#fs_fs_lstat_path_callback">fs.lstat(path, callback)</a></li>
<li><a href="https://nodejs.org/docs/latest-v5.x/api/fs.html#fs_fs_lstatsync_path">fs.lstatSync(path)</a></li>
<li><a href="https://nodejs.org/docs/latest-v5.x/api/fs.html#fs_fs_mkdir_path_mode_callback">fs.mkdir(path[, mode], callback)</a></li>
<li><a href="https://nodejs.org/docs/latest-v5.x/api/fs.html#fs_fs_mkdirsync_path_mode">fs.mkdirSync(path[, mode])</a></li>
<li><a href="https://nodejs.org/docs/latest-v5.x/api/fs.html#fs_fs_mkdtemp_prefix_callback">fs.mkdtemp(prefix, callback)</a></li>
<li><a href="https://nodejs.org/docs/latest-v5.x/api/fs.html#fs_fs_mkdtempsync_template">fs.mkdtempSync(template)</a></li>
<li><a href="https://nodejs.org/docs/latest-v5.x/api/fs.html#fs_fs_open_path_flags_mode_callback">fs.open(path, flags[, mode], callback)</a></li>
<li><a href="https://nodejs.org/docs/latest-v5.x/api/fs.html#fs_fs_opensync_path_flags_mode">fs.openSync(path, flags[, mode])</a></li>
<li><a href="https://nodejs.org/docs/latest-v5.x/api/fs.html#fs_fs_read_fd_buffer_offset_length_position_callback">fs.read(fd, buffer, offset, length, position, callback)</a></li>
<li><a href="https://nodejs.org/docs/latest-v5.x/api/fs.html#fs_fs_readdir_path_callback">fs.readdir(path, callback)</a></li>
<li><a href="https://nodejs.org/docs/latest-v5.x/api/fs.html#fs_fs_readdirsync_path">fs.readdirSync(path)</a></li>
<li><a href="https://nodejs.org/docs/latest-v5.x/api/fs.html#fs_fs_readfile_file_options_callback">fs.readFile(file[, options], callback)</a></li>
<li><a href="https://nodejs.org/docs/latest-v5.x/api/fs.html#fs_fs_readfilesync_file_options">fs.readFileSync(file[, options])</a></li>
<li><a href="https://nodejs.org/docs/latest-v5.x/api/fs.html#fs_fs_readlink_path_callback">fs.readlink(path, callback)</a></li>
<li><a href="https://nodejs.org/docs/latest-v5.x/api/fs.html#fs_fs_readlinksync_path">fs.readlinkSync(path)</a></li>
<li><a href="https://nodejs.org/docs/latest-v5.x/api/fs.html#fs_fs_realpath_path_cache_callback">fs.realpath(path[, cache], callback)</a></li>
<li><a href="https://nodejs.org/docs/latest-v5.x/api/fs.html#fs_fs_readsync_fd_buffer_offset_length_position">fs.readSync(fd, buffer, offset, length, position)</a></li>
<li><a href="https://nodejs.org/docs/latest-v5.x/api/fs.html#fs_fs_realpathsync_path_cache">fs.realpathSync(path[, cache])</a></li>
<li><a href="https://nodejs.org/docs/latest-v5.x/api/fs.html#fs_fs_rename_oldpath_newpath_callback">fs.rename(oldPath, newPath, callback)</a></li>
<li><a href="https://nodejs.org/docs/latest-v5.x/api/fs.html#fs_fs_renamesync_oldpath_newpath">fs.renameSync(oldPath, newPath)</a></li>
<li><a href="https://nodejs.org/docs/latest-v5.x/api/fs.html#fs_fs_rmdir_path_callback">fs.rmdir(path, callback)</a></li>
<li><a href="https://nodejs.org/docs/latest-v5.x/api/fs.html#fs_fs_rmdirsync_path">fs.rmdirSync(path)</a></li>
<li><a href="https://nodejs.org/docs/latest-v5.x/api/fs.html#fs_fs_stat_path_callback">fs.stat(path, callback)</a></li>
<li><a href="https://nodejs.org/docs/latest-v5.x/api/fs.html#fs_fs_statsync_path">fs.statSync(path)</a></li>
<li><a href="https://nodejs.org/docs/latest-v5.x/api/fs.html#fs_fs_symlink_target_path_type_callback">fs.symlink(target, path[, type], callback)</a></li>
<li><a href="https://nodejs.org/docs/latest-v5.x/api/fs.html#fs_fs_symlinksync_target_path_type">fs.symlinkSync(target, path[, type])</a></li>
<li><a href="https://nodejs.org/docs/latest-v5.x/api/fs.html#fs_fs_truncate_path_len_callback">fs.truncate(path, len, callback)</a></li>
<li><a href="https://nodejs.org/docs/latest-v5.x/api/fs.html#fs_fs_truncatesync_path_len">fs.truncateSync(path, len)</a></li>
<li><a href="https://nodejs.org/docs/latest-v5.x/api/fs.html#fs_fs_unlink_path_callback">fs.unlink(path, callback)</a></li>
<li><a href="https://nodejs.org/docs/latest-v5.x/api/fs.html#fs_fs_unlinksync_path">fs.unlinkSync(path)</a></li>
<li><a href="https://nodejs.org/docs/latest-v5.x/api/fs.html#fs_fs_unwatchfile_filename_listener">fs.unwatchFile(filename[, listener])</a></li>
<li><a href="https://nodejs.org/docs/latest-v5.x/api/fs.html#fs_fs_utimes_path_atime_mtime_callback">fs.utimes(path, atime, mtime, callback)</a></li>
<li><a href="https://nodejs.org/docs/latest-v5.x/api/fs.html#fs_fs_utimessync_path_atime_mtime">fs.utimesSync(path, atime, mtime)</a></li>
<li><a href="https://nodejs.org/docs/latest-v5.x/api/fs.html#fs_fs_watch_filename_options_listener">fs.watch(filename[, options][, listener])</a><ul>
<li><a href="https://nodejs.org/docs/latest-v5.x/api/fs.html#fs_caveats">Caveats</a><ul>
<li><a href="https://nodejs.org/docs/latest-v5.x/api/fs.html#fs_availability">Availability</a></li>
<li><a href="https://nodejs.org/docs/latest-v5.x/api/fs.html#fs_inodes">Inodes</a></li>
<li><a href="https://nodejs.org/docs/latest-v5.x/api/fs.html#fs_filename_argument">Filename Argument</a></li>
</ul>
</li>
</ul>
</li>
<li><a href="https://nodejs.org/docs/latest-v5.x/api/fs.html#fs_fs_watchfile_filename_options_listener">fs.watchFile(filename[, options], listener)</a></li>
<li><a href="https://nodejs.org/docs/latest-v5.x/api/fs.html#fs_fs_write_fd_buffer_offset_length_position_callback">fs.write(fd, buffer, offset, length[, position], callback)</a></li>
<li><a href="https://nodejs.org/docs/latest-v5.x/api/fs.html#fs_fs_write_fd_data_position_encoding_callback">fs.write(fd, data[, position[, encoding]], callback)</a></li>
<li><a href="https://nodejs.org/docs/latest-v5.x/api/fs.html#fs_fs_writefile_file_data_options_callback">fs.writeFile(file, data[, options], callback)</a></li>
<li><a href="https://nodejs.org/docs/latest-v5.x/api/fs.html#fs_fs_writefilesync_file_data_options">fs.writeFileSync(file, data[, options])</a></li>
<li><a href="https://nodejs.org/docs/latest-v5.x/api/fs.html#fs_fs_writesync_fd_buffer_offset_length_position">fs.writeSync(fd, buffer, offset, length[, position])</a></li>
<li><a href="https://nodejs.org/docs/latest-v5.x/api/fs.html#fs_fs_writesync_fd_data_position_encoding">fs.writeSync(fd, data[, position[, encoding]])</a></li>
</ul>
</li>
</ul>

      </div>

      <div id="apicontent">
        <h1>File System<span><a class="mark" href="https://nodejs.org/docs/latest-v5.x/api/fs.html#fs_file_system" id="fs_file_system">#</a></span></h1>
<pre class="api_stability api_stability_2 sh_sourceCode">Stability<span class="sh_symbol">:</span> <span class="sh_number">2</span> <span class="sh_symbol">-</span> Stable</pre><!--name=fs-->

<p>File I/O is provided by simple wrappers around standard POSIX functions.  To
use this module do <code>require('fs')</code>. All the methods have asynchronous and
synchronous forms.

</p>
<p>The asynchronous form always takes a completion callback as its last argument.
The arguments passed to the completion callback depend on the method, but the
first argument is always reserved for an exception. If the operation was
completed successfully, then the first argument will be <code>null</code> or <code>undefined</code>.

</p>
<p>When using the synchronous form any exceptions are immediately thrown.
You can use try/catch to handle exceptions or allow them to bubble up.

</p>
<p>Here is an example of the asynchronous version:

</p>
<pre class="sh_sourceCode"><code class="js"><span class="sh_keyword">const</span> fs <span class="sh_symbol">=</span> <span class="sh_function">require</span><span class="sh_symbol">(</span><span class="sh_string">'fs'</span><span class="sh_symbol">);</span>

fs<span class="sh_symbol">.</span><span class="sh_function">unlink</span><span class="sh_symbol">(</span><span class="sh_string">'/tmp/hello'</span><span class="sh_symbol">,</span> <span class="sh_symbol">(</span>err<span class="sh_symbol">)</span> <span class="sh_symbol">=&gt;</span> <span class="sh_cbracket">{</span>
  <span class="sh_keyword">if</span> <span class="sh_symbol">(</span>err<span class="sh_symbol">)</span> <span class="sh_keyword">throw</span> err<span class="sh_symbol">;</span>
  console<span class="sh_symbol">.</span><span class="sh_function">log</span><span class="sh_symbol">(</span><span class="sh_string">'successfully deleted /tmp/hello'</span><span class="sh_symbol">);</span>
<span class="sh_cbracket">}</span><span class="sh_symbol">);</span></code></pre>
<p>Here is the synchronous version:

</p>
<pre class="sh_sourceCode"><code class="js"><span class="sh_keyword">const</span> fs <span class="sh_symbol">=</span> <span class="sh_function">require</span><span class="sh_symbol">(</span><span class="sh_string">'fs'</span><span class="sh_symbol">);</span>

fs<span class="sh_symbol">.</span><span class="sh_function">unlinkSync</span><span class="sh_symbol">(</span><span class="sh_string">'/tmp/hello'</span><span class="sh_symbol">);</span>
console<span class="sh_symbol">.</span><span class="sh_function">log</span><span class="sh_symbol">(</span><span class="sh_string">'successfully deleted /tmp/hello'</span><span class="sh_symbol">);</span></code></pre>
<p>With the asynchronous methods there is no guaranteed ordering. So the
following is prone to error:

</p>
<pre class="sh_sourceCode"><code class="js">fs<span class="sh_symbol">.</span><span class="sh_function">rename</span><span class="sh_symbol">(</span><span class="sh_string">'/tmp/hello'</span><span class="sh_symbol">,</span> <span class="sh_string">'/tmp/world'</span><span class="sh_symbol">,</span> <span class="sh_symbol">(</span>err<span class="sh_symbol">)</span> <span class="sh_symbol">=&gt;</span> <span class="sh_cbracket">{</span>
  <span class="sh_keyword">if</span> <span class="sh_symbol">(</span>err<span class="sh_symbol">)</span> <span class="sh_keyword">throw</span> err<span class="sh_symbol">;</span>
  console<span class="sh_symbol">.</span><span class="sh_function">log</span><span class="sh_symbol">(</span><span class="sh_string">'renamed complete'</span><span class="sh_symbol">);</span>
<span class="sh_cbracket">}</span><span class="sh_symbol">);</span>
fs<span class="sh_symbol">.</span><span class="sh_function">stat</span><span class="sh_symbol">(</span><span class="sh_string">'/tmp/world'</span><span class="sh_symbol">,</span> <span class="sh_symbol">(</span>err<span class="sh_symbol">,</span> stats<span class="sh_symbol">)</span> <span class="sh_symbol">=&gt;</span> <span class="sh_cbracket">{</span>
  <span class="sh_keyword">if</span> <span class="sh_symbol">(</span>err<span class="sh_symbol">)</span> <span class="sh_keyword">throw</span> err<span class="sh_symbol">;</span>
  console<span class="sh_symbol">.</span><span class="sh_function">log</span><span class="sh_symbol">(</span>`stats<span class="sh_symbol">:</span> $<span class="sh_cbracket">{</span>JSON<span class="sh_symbol">.</span><span class="sh_function">stringify</span><span class="sh_symbol">(</span>stats<span class="sh_symbol">)</span><span class="sh_cbracket">}</span>`<span class="sh_symbol">);</span>
<span class="sh_cbracket">}</span><span class="sh_symbol">);</span></code></pre>
<p>It could be that <code>fs.stat</code> is executed before <code>fs.rename</code>.
The correct way to do this is to chain the callbacks.

</p>
<pre class="sh_sourceCode"><code class="js">fs<span class="sh_symbol">.</span><span class="sh_function">rename</span><span class="sh_symbol">(</span><span class="sh_string">'/tmp/hello'</span><span class="sh_symbol">,</span> <span class="sh_string">'/tmp/world'</span><span class="sh_symbol">,</span> <span class="sh_symbol">(</span>err<span class="sh_symbol">)</span> <span class="sh_symbol">=&gt;</span> <span class="sh_cbracket">{</span>
  <span class="sh_keyword">if</span> <span class="sh_symbol">(</span>err<span class="sh_symbol">)</span> <span class="sh_keyword">throw</span> err<span class="sh_symbol">;</span>
  fs<span class="sh_symbol">.</span><span class="sh_function">stat</span><span class="sh_symbol">(</span><span class="sh_string">'/tmp/world'</span><span class="sh_symbol">,</span> <span class="sh_symbol">(</span>err<span class="sh_symbol">,</span> stats<span class="sh_symbol">)</span> <span class="sh_symbol">=&gt;</span> <span class="sh_cbracket">{</span>
    <span class="sh_keyword">if</span> <span class="sh_symbol">(</span>err<span class="sh_symbol">)</span> <span class="sh_keyword">throw</span> err<span class="sh_symbol">;</span>
    console<span class="sh_symbol">.</span><span class="sh_function">log</span><span class="sh_symbol">(</span>`stats<span class="sh_symbol">:</span> $<span class="sh_cbracket">{</span>JSON<span class="sh_symbol">.</span><span class="sh_function">stringify</span><span class="sh_symbol">(</span>stats<span class="sh_symbol">)</span><span class="sh_cbracket">}</span>`<span class="sh_symbol">);</span>
  <span class="sh_cbracket">}</span><span class="sh_symbol">);</span>
<span class="sh_cbracket">}</span><span class="sh_symbol">);</span></code></pre>
<p>In busy processes, the programmer is <em>strongly encouraged</em> to use the
asynchronous versions of these calls. The synchronous versions will block
the entire process until they complete--halting all connections.

</p>
<p>The relative path to a filename can be used. Remember, however, that this path
will be relative to <code>process.cwd()</code>.

</p>
<p>Most fs functions let you omit the callback argument. If you do, a default
callback is used that rethrows errors. To get a trace to the original call
site, set the <code>NODE_DEBUG</code> environment variable:

</p>
<pre class="sh_sourceCode"><code>$ cat script<span class="sh_symbol">.</span>js
<span class="sh_keyword">function</span> <span class="sh_function">bad</span><span class="sh_symbol">()</span> <span class="sh_cbracket">{</span>
  <span class="sh_function">require</span><span class="sh_symbol">(</span><span class="sh_string">'fs'</span><span class="sh_symbol">).</span><span class="sh_function">readFile</span><span class="sh_symbol">(</span><span class="sh_string">'/'</span><span class="sh_symbol">);</span>
<span class="sh_cbracket">}</span>
<span class="sh_function">bad</span><span class="sh_symbol">();</span>

$ env NODE_DEBUG<span class="sh_symbol">=</span>fs node script<span class="sh_symbol">.</span>js
fs<span class="sh_symbol">.</span>js<span class="sh_symbol">:</span><span class="sh_number">66</span>
        <span class="sh_keyword">throw</span> err<span class="sh_symbol">;</span>
              <span class="sh_symbol">^</span>
<span class="sh_predef_func">Error</span><span class="sh_symbol">:</span> EISDIR<span class="sh_symbol">,</span> read
    at <span class="sh_function">rethrow</span> <span class="sh_symbol">(</span>fs<span class="sh_symbol">.</span>js<span class="sh_symbol">:</span><span class="sh_number">61</span><span class="sh_symbol">:</span><span class="sh_number">21</span><span class="sh_symbol">)</span>
    at <span class="sh_function">maybeCallback</span> <span class="sh_symbol">(</span>fs<span class="sh_symbol">.</span>js<span class="sh_symbol">:</span><span class="sh_number">79</span><span class="sh_symbol">:</span><span class="sh_number">42</span><span class="sh_symbol">)</span>
    at <span class="sh_predef_func">Object</span><span class="sh_symbol">.</span>fs<span class="sh_symbol">.</span><span class="sh_function">readFile</span> <span class="sh_symbol">(</span>fs<span class="sh_symbol">.</span>js<span class="sh_symbol">:</span><span class="sh_number">153</span><span class="sh_symbol">:</span><span class="sh_number">18</span><span class="sh_symbol">)</span>
    at <span class="sh_function">bad</span> <span class="sh_symbol">(</span><span class="sh_regexp">/path/</span><span class="sh_normal">to</span><span class="sh_symbol">/</span>script<span class="sh_symbol">.</span>js<span class="sh_symbol">:</span><span class="sh_number">2</span><span class="sh_symbol">:</span><span class="sh_number">17</span><span class="sh_symbol">)</span>
    at <span class="sh_predef_func">Object</span><span class="sh_symbol">.&lt;</span>anonymous<span class="sh_symbol">&gt;</span> <span class="sh_symbol">(</span><span class="sh_regexp">/path/</span><span class="sh_normal">to</span><span class="sh_symbol">/</span>script<span class="sh_symbol">.</span>js<span class="sh_symbol">:</span><span class="sh_number">5</span><span class="sh_symbol">:</span><span class="sh_number">1</span><span class="sh_symbol">)</span>
    <span class="sh_symbol">&lt;</span>etc<span class="sh_symbol">.&gt;</span></code></pre>
<h2>Buffer API<span><a class="mark" href="https://nodejs.org/docs/latest-v5.x/api/fs.html#fs_buffer_api" id="fs_buffer_api">#</a></span></h2>
<p><code>fs</code> functions support passing and receiving paths as both strings
and Buffers. The latter is intended to make it possible to work with
filesystems that allow for non-UTF-8 filenames. For most typical
uses, working with paths as Buffers will be unnecessary, as the string
API converts to and from UTF-8 automatically.

</p>
<p><em>Note</em> that on certain file systems (such as NTFS and HFS+) filenames
will always be encoded as UTF-8. On such file systems, passing
non-UTF-8 encoded Buffers to <code>fs</code> functions will not work as expected.

</p>
<h2>Class: fs.FSWatcher<span><a class="mark" href="https://nodejs.org/docs/latest-v5.x/api/fs.html#fs_class_fs_fswatcher" id="fs_class_fs_fswatcher">#</a></span></h2>
<p>Objects returned from <code>fs.watch()</code> are of this type.

</p>
<h3>Event: 'change'<span><a class="mark" href="https://nodejs.org/docs/latest-v5.x/api/fs.html#fs_event_change" id="fs_event_change">#</a></span></h3>
<div class="signature"><ul>
<li><code>event</code> <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type" class="type">&lt;String&gt;</a> The type of fs change</li>
<li><code>filename</code> <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type" class="type">&lt;String&gt;</a> The filename that changed (if relevant/available)</li>
</ul>
</div><p>Emitted when something changes in a watched directory or file.
See more details in <a href="https://nodejs.org/docs/latest-v5.x/api/fs.html#fs_fs_watch_filename_options_listener"><code>fs.watch()</code></a>.

</p>
<h3>Event: 'error'<span><a class="mark" href="https://nodejs.org/docs/latest-v5.x/api/fs.html#fs_event_error" id="fs_event_error">#</a></span></h3>
<div class="signature"><ul>
<li><code>error</code> <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error" class="type">&lt;Error&gt;</a></li>
</ul>
</div><p>Emitted when an error occurs.

</p>
<h3>watcher.close()<span><a class="mark" href="https://nodejs.org/docs/latest-v5.x/api/fs.html#fs_watcher_close" id="fs_watcher_close">#</a></span></h3>
<p>Stop watching for changes on the given <code>fs.FSWatcher</code>.

</p>
<h2>Class: fs.ReadStream<span><a class="mark" href="https://nodejs.org/docs/latest-v5.x/api/fs.html#fs_class_fs_readstream" id="fs_class_fs_readstream">#</a></span></h2>
<p><code>ReadStream</code> is a <a href="https://nodejs.org/docs/latest-v5.x/api/stream.html#stream_class_stream_readable">Readable Stream</a>.

</p>
<h3>Event: 'open'<span><a class="mark" href="https://nodejs.org/docs/latest-v5.x/api/fs.html#fs_event_open" id="fs_event_open">#</a></span></h3>
<div class="signature"><ul>
<li><code>fd</code> <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Number_type" class="type">&lt;Number&gt;</a> Integer file descriptor used by the ReadStream.</li>
</ul>
</div><p>Emitted when the ReadStream's file is opened.

</p>
<h3>readStream.path<span><a class="mark" href="https://nodejs.org/docs/latest-v5.x/api/fs.html#fs_readstream_path" id="fs_readstream_path">#</a></span></h3>
<p>The path to the file the stream is reading from.

</p>
<h2>Class: fs.Stats<span><a class="mark" href="https://nodejs.org/docs/latest-v5.x/api/fs.html#fs_class_fs_stats" id="fs_class_fs_stats">#</a></span></h2>
<p>Objects returned from <a href="https://nodejs.org/docs/latest-v5.x/api/fs.html#fs_fs_stat_path_callback"><code>fs.stat()</code></a>, <a href="https://nodejs.org/docs/latest-v5.x/api/fs.html#fs_fs_lstat_path_callback"><code>fs.lstat()</code></a> and <a href="https://nodejs.org/docs/latest-v5.x/api/fs.html#fs_fs_fstat_fd_callback"><code>fs.fstat()</code></a> and their
synchronous counterparts are of this type.

</p>
<ul>
<li><code>stats.isFile()</code></li>
<li><code>stats.isDirectory()</code></li>
<li><code>stats.isBlockDevice()</code></li>
<li><code>stats.isCharacterDevice()</code></li>
<li><code>stats.isSymbolicLink()</code> (only valid with <a href="https://nodejs.org/docs/latest-v5.x/api/fs.html#fs_fs_lstat_path_callback"><code>fs.lstat()</code></a>)</li>
<li><code>stats.isFIFO()</code></li>
<li><code>stats.isSocket()</code></li>
</ul>
<p>For a regular file <a href="https://nodejs.org/docs/latest-v5.x/api/util.html#util_util_inspect_object_options"><code>util.inspect(stats)</code></a> would return a string very
similar to this:

</p>
<pre class="sh_sourceCode"><code class="js"><span class="sh_cbracket">{</span>
  dev<span class="sh_symbol">:</span> <span class="sh_number">2114</span><span class="sh_symbol">,</span>
  ino<span class="sh_symbol">:</span> <span class="sh_number">48064969</span><span class="sh_symbol">,</span>
  mode<span class="sh_symbol">:</span> <span class="sh_number">33188</span><span class="sh_symbol">,</span>
  nlink<span class="sh_symbol">:</span> <span class="sh_number">1</span><span class="sh_symbol">,</span>
  uid<span class="sh_symbol">:</span> <span class="sh_number">85</span><span class="sh_symbol">,</span>
  gid<span class="sh_symbol">:</span> <span class="sh_number">100</span><span class="sh_symbol">,</span>
  rdev<span class="sh_symbol">:</span> <span class="sh_number">0</span><span class="sh_symbol">,</span>
  size<span class="sh_symbol">:</span> <span class="sh_number">527</span><span class="sh_symbol">,</span>
  blksize<span class="sh_symbol">:</span> <span class="sh_number">4096</span><span class="sh_symbol">,</span>
  blocks<span class="sh_symbol">:</span> <span class="sh_number">8</span><span class="sh_symbol">,</span>
  atime<span class="sh_symbol">:</span> Mon<span class="sh_symbol">,</span> <span class="sh_number">10</span> Oct <span class="sh_number">2011</span> <span class="sh_number">23</span><span class="sh_symbol">:</span><span class="sh_number">24</span><span class="sh_symbol">:</span><span class="sh_number">11</span> GMT<span class="sh_symbol">,</span>
  mtime<span class="sh_symbol">:</span> Mon<span class="sh_symbol">,</span> <span class="sh_number">10</span> Oct <span class="sh_number">2011</span> <span class="sh_number">23</span><span class="sh_symbol">:</span><span class="sh_number">24</span><span class="sh_symbol">:</span><span class="sh_number">11</span> GMT<span class="sh_symbol">,</span>
  ctime<span class="sh_symbol">:</span> Mon<span class="sh_symbol">,</span> <span class="sh_number">10</span> Oct <span class="sh_number">2011</span> <span class="sh_number">23</span><span class="sh_symbol">:</span><span class="sh_number">24</span><span class="sh_symbol">:</span><span class="sh_number">11</span> GMT<span class="sh_symbol">,</span>
  birthtime<span class="sh_symbol">:</span> Mon<span class="sh_symbol">,</span> <span class="sh_number">10</span> Oct <span class="sh_number">2011</span> <span class="sh_number">23</span><span class="sh_symbol">:</span><span class="sh_number">24</span><span class="sh_symbol">:</span><span class="sh_number">11</span> GMT
<span class="sh_cbracket">}</span></code></pre>
<p>Please note that <code>atime</code>, <code>mtime</code>, <code>birthtime</code>, and <code>ctime</code> are
instances of <a href="https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/Date"><code>Date</code></a> object and to compare the values of
these objects you should use appropriate methods. For most general
uses <a href="https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/Date/getTime"><code>getTime()</code></a> will return the number of
milliseconds elapsed since <em>1 January 1970 00:00:00 UTC</em> and this
integer should be sufficient for any comparison, however there are
additional methods which can be used for displaying fuzzy information.
More details can be found in the <a href="https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/Date">MDN JavaScript Reference</a>
page.

</p>
<h3>Stat Time Values<span><a class="mark" href="https://nodejs.org/docs/latest-v5.x/api/fs.html#fs_stat_time_values" id="fs_stat_time_values">#</a></span></h3>
<p>The times in the stat object have the following semantics:

</p>
<ul>
<li><code>atime</code> "Access Time" - Time when file data last accessed.  Changed
by the <code>mknod(2)</code>, <code>utimes(2)</code>, and <code>read(2)</code> system calls.</li>
<li><code>mtime</code> "Modified Time" - Time when file data last modified.
Changed by the <code>mknod(2)</code>, <code>utimes(2)</code>, and <code>write(2)</code> system calls.</li>
<li><code>ctime</code> "Change Time" - Time when file status was last changed
(inode data modification).  Changed by the <code>chmod(2)</code>, <code>chown(2)</code>,
<code>link(2)</code>, <code>mknod(2)</code>, <code>rename(2)</code>, <code>unlink(2)</code>, <code>utimes(2)</code>,
<code>read(2)</code>, and <code>write(2)</code> system calls.</li>
<li><code>birthtime</code> "Birth Time" -  Time of file creation. Set once when the
file is created.  On filesystems where birthtime is not available,
this field may instead hold either the <code>ctime</code> or
<code>1970-01-01T00:00Z</code> (ie, unix epoch timestamp <code>0</code>). Note that this
value may be greater than <code>atime</code> or <code>mtime</code> in this case. On Darwin
and other FreeBSD variants, also set if the <code>atime</code> is explicitly
set to an earlier value than the current <code>birthtime</code> using the
<code>utimes(2)</code> system call.</li>
</ul>
<p>Prior to Node v0.12, the <code>ctime</code> held the <code>birthtime</code> on Windows
systems.  Note that as of v0.12, <code>ctime</code> is not "creation time", and
on Unix systems, it never was.

</p>
<h2>Class: fs.WriteStream<span><a class="mark" href="https://nodejs.org/docs/latest-v5.x/api/fs.html#fs_class_fs_writestream" id="fs_class_fs_writestream">#</a></span></h2>
<p><code>WriteStream</code> is a <a href="https://nodejs.org/docs/latest-v5.x/api/stream.html#stream_class_stream_writable">Writable Stream</a>.

</p>
<h3>Event: 'open'<span><a class="mark" href="https://nodejs.org/docs/latest-v5.x/api/fs.html#fs_event_open_1" id="fs_event_open_1">#</a></span></h3>
<div class="signature"><ul>
<li><code>fd</code> <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Number_type" class="type">&lt;Number&gt;</a> Integer file descriptor used by the WriteStream.</li>
</ul>
</div><p>Emitted when the WriteStream's file is opened.

</p>
<h3>writeStream.bytesWritten<span><a class="mark" href="https://nodejs.org/docs/latest-v5.x/api/fs.html#fs_writestream_byteswritten" id="fs_writestream_byteswritten">#</a></span></h3>
<p>The number of bytes written so far. Does not include data that is still queued
for writing.

</p>
<h3>writeStream.path<span><a class="mark" href="https://nodejs.org/docs/latest-v5.x/api/fs.html#fs_writestream_path" id="fs_writestream_path">#</a></span></h3>
<p>The path to the file the stream is writing to.

</p>
<h2>fs.access(path[, mode], callback)<span><a class="mark" href="https://nodejs.org/docs/latest-v5.x/api/fs.html#fs_fs_access_path_mode_callback" id="fs_fs_access_path_mode_callback">#</a></span></h2>
<p>Tests a user's permissions for the file specified by <code>path</code>. <code>mode</code> is an
optional integer that specifies the accessibility checks to be performed. The
following constants define the possible values of <code>mode</code>. It is possible to
create a mask consisting of the bitwise OR of two or more values.

</p>
<ul>
<li><code>fs.F_OK</code> - File is visible to the calling process. This is useful for
determining if a file exists, but says nothing about <code>rwx</code> permissions.
Default if no <code>mode</code> is specified.</li>
<li><code>fs.R_OK</code> - File can be read by the calling process.</li>
<li><code>fs.W_OK</code> - File can be written by the calling process.</li>
<li><code>fs.X_OK</code> - File can be executed by the calling process. This has no effect
on Windows (will behave like <code>fs.F_OK</code>).</li>
</ul>
<p>The final argument, <code>callback</code>, is a callback function that is invoked with
a possible error argument. If any of the accessibility checks fail, the error
argument will be populated. The following example checks if the file
<code>/etc/passwd</code> can be read and written by the current process.

</p>
<pre class="sh_sourceCode"><code class="js">fs<span class="sh_symbol">.</span><span class="sh_function">access</span><span class="sh_symbol">(</span><span class="sh_string">'/etc/passwd'</span><span class="sh_symbol">,</span> fs<span class="sh_symbol">.</span>R_OK <span class="sh_symbol">|</span> fs<span class="sh_symbol">.</span>W_OK<span class="sh_symbol">,</span> <span class="sh_symbol">(</span>err<span class="sh_symbol">)</span> <span class="sh_symbol">=&gt;</span> <span class="sh_cbracket">{</span>
  console<span class="sh_symbol">.</span><span class="sh_function">log</span><span class="sh_symbol">(</span>err <span class="sh_symbol">?</span> <span class="sh_string">'no access!'</span> <span class="sh_symbol">:</span> <span class="sh_string">'can read/write'</span><span class="sh_symbol">);</span>
<span class="sh_cbracket">}</span><span class="sh_symbol">);</span></code></pre>
<h2>fs.accessSync(path[, mode])<span><a class="mark" href="https://nodejs.org/docs/latest-v5.x/api/fs.html#fs_fs_accesssync_path_mode" id="fs_fs_accesssync_path_mode">#</a></span></h2>
<p>Synchronous version of <a href="https://nodejs.org/docs/latest-v5.x/api/fs.html#fs_fs_access_path_mode_callback"><code>fs.access()</code></a>. This throws if any accessibility checks
fail, and does nothing otherwise.

</p>
<h2>fs.appendFile(file, data[, options], callback)<span><a class="mark" href="https://nodejs.org/docs/latest-v5.x/api/fs.html#fs_fs_appendfile_file_data_options_callback" id="fs_fs_appendfile_file_data_options_callback">#</a></span></h2>
<div class="signature"><ul>
<li><code>file</code> <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type" class="type">&lt;String&gt;</a> | <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Number_type" class="type">&lt;Number&gt;</a> filename or file descriptor</li>
<li><code>data</code> <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type" class="type">&lt;String&gt;</a> | <a href="https://nodejs.org/docs/latest-v5.x/api/buffer.html#buffer_class_buffer" class="type">&lt;Buffer&gt;</a></li>
<li><code>options</code> <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object" class="type">&lt;Object&gt;</a> | <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type" class="type">&lt;String&gt;</a><ul>
<li><code>encoding</code> <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type" class="type">&lt;String&gt;</a> | <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Null_type" class="type">&lt;Null&gt;</a> default = <code>'utf8'</code></li>
<li><code>mode</code> <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Number_type" class="type">&lt;Number&gt;</a> default = <code>0o666</code></li>
<li><code>flag</code> <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type" class="type">&lt;String&gt;</a> default = <code>'a'</code></li>
</ul>
</li>
<li><code>callback</code> <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function" class="type">&lt;Function&gt;</a></li>
</ul>
</div><p>Asynchronously append data to a file, creating the file if it does not yet exist.
<code>data</code> can be a string or a buffer.

</p>
<p>Example:

</p>
<pre class="sh_sourceCode"><code class="js">fs<span class="sh_symbol">.</span><span class="sh_function">appendFile</span><span class="sh_symbol">(</span><span class="sh_string">'message.txt'</span><span class="sh_symbol">,</span> <span class="sh_string">'data to append'</span><span class="sh_symbol">,</span> <span class="sh_symbol">(</span>err<span class="sh_symbol">)</span> <span class="sh_symbol">=&gt;</span> <span class="sh_cbracket">{</span>
  <span class="sh_keyword">if</span> <span class="sh_symbol">(</span>err<span class="sh_symbol">)</span> <span class="sh_keyword">throw</span> err<span class="sh_symbol">;</span>
  console<span class="sh_symbol">.</span><span class="sh_function">log</span><span class="sh_symbol">(</span><span class="sh_string">'The "data to append" was appended to file!'</span><span class="sh_symbol">);</span>
<span class="sh_cbracket">}</span><span class="sh_symbol">);</span></code></pre>
<p>If <code>options</code> is a string, then it specifies the encoding. Example:

</p>
<pre class="sh_sourceCode"><code class="js">fs<span class="sh_symbol">.</span><span class="sh_function">appendFile</span><span class="sh_symbol">(</span><span class="sh_string">'message.txt'</span><span class="sh_symbol">,</span> <span class="sh_string">'data to append'</span><span class="sh_symbol">,</span> <span class="sh_string">'utf8'</span><span class="sh_symbol">,</span> callback<span class="sh_symbol">);</span></code></pre>
<p>Any specified file descriptor has to have been opened for appending.

</p>
<p><em>Note: Specified file descriptors will not be closed automatically.</em>

</p>
<h2>fs.appendFileSync(file, data[, options])<span><a class="mark" href="https://nodejs.org/docs/latest-v5.x/api/fs.html#fs_fs_appendfilesync_file_data_options" id="fs_fs_appendfilesync_file_data_options">#</a></span></h2>
<p>The synchronous version of <a href="https://nodejs.org/docs/latest-v5.x/api/fs.html#fs_fs_appendfile_file_data_options_callback"><code>fs.appendFile()</code></a>. Returns <code>undefined</code>.

</p>
<h2>fs.chmod(path, mode, callback)<span><a class="mark" href="https://nodejs.org/docs/latest-v5.x/api/fs.html#fs_fs_chmod_path_mode_callback" id="fs_fs_chmod_path_mode_callback">#</a></span></h2>
<p>Asynchronous <a href="http://man7.org/linux/man-pages/man2/chmod.2.html">chmod(2)</a>. No arguments other than a possible exception are given
to the completion callback.

</p>
<h2>fs.chmodSync(path, mode)<span><a class="mark" href="https://nodejs.org/docs/latest-v5.x/api/fs.html#fs_fs_chmodsync_path_mode" id="fs_fs_chmodsync_path_mode">#</a></span></h2>
<p>Synchronous <a href="http://man7.org/linux/man-pages/man2/chmod.2.html">chmod(2)</a>. Returns <code>undefined</code>.

</p>
<h2>fs.chown(path, uid, gid, callback)<span><a class="mark" href="https://nodejs.org/docs/latest-v5.x/api/fs.html#fs_fs_chown_path_uid_gid_callback" id="fs_fs_chown_path_uid_gid_callback">#</a></span></h2>
<p>Asynchronous <a href="http://man7.org/linux/man-pages/man2/chown.2.html">chown(2)</a>. No arguments other than a possible exception are given
to the completion callback.

</p>
<h2>fs.chownSync(path, uid, gid)<span><a class="mark" href="https://nodejs.org/docs/latest-v5.x/api/fs.html#fs_fs_chownsync_path_uid_gid" id="fs_fs_chownsync_path_uid_gid">#</a></span></h2>
<p>Synchronous <a href="http://man7.org/linux/man-pages/man2/chown.2.html">chown(2)</a>. Returns <code>undefined</code>.

</p>
<h2>fs.close(fd, callback)<span><a class="mark" href="https://nodejs.org/docs/latest-v5.x/api/fs.html#fs_fs_close_fd_callback" id="fs_fs_close_fd_callback">#</a></span></h2>
<p>Asynchronous <a href="http://man7.org/linux/man-pages/man2/close.2.html">close(2)</a>.  No arguments other than a possible exception are given
to the completion callback.

</p>
<h2>fs.closeSync(fd)<span><a class="mark" href="https://nodejs.org/docs/latest-v5.x/api/fs.html#fs_fs_closesync_fd" id="fs_fs_closesync_fd">#</a></span></h2>
<p>Synchronous <a href="http://man7.org/linux/man-pages/man2/close.2.html">close(2)</a>. Returns <code>undefined</code>.

</p>
<h2>fs.createReadStream(path[, options])<span><a class="mark" href="https://nodejs.org/docs/latest-v5.x/api/fs.html#fs_fs_createreadstream_path_options" id="fs_fs_createreadstream_path_options">#</a></span></h2>
<p>Returns a new <a href="https://nodejs.org/docs/latest-v5.x/api/fs.html#fs_class_fs_readstream"><code>ReadStream</code></a> object. (See <a href="https://nodejs.org/docs/latest-v5.x/api/stream.html#stream_class_stream_readable">Readable Stream</a>).

</p>
<p>Be aware that, unlike the default value set for <code>highWaterMark</code> on a
readable stream (16 kb), the stream returned by this method has a
default value of 64 kb for the same parameter.

</p>
<p><code>options</code> is an object or string with the following defaults:

</p>
<pre class="sh_sourceCode"><code class="js"><span class="sh_cbracket">{</span>
  flags<span class="sh_symbol">:</span> <span class="sh_string">'r'</span><span class="sh_symbol">,</span>
  encoding<span class="sh_symbol">:</span> <span class="sh_keyword">null</span><span class="sh_symbol">,</span>
  fd<span class="sh_symbol">:</span> <span class="sh_keyword">null</span><span class="sh_symbol">,</span>
  mode<span class="sh_symbol">:</span> 0o666<span class="sh_symbol">,</span>
  autoClose<span class="sh_symbol">:</span> <span class="sh_keyword">true</span>
<span class="sh_cbracket">}</span></code></pre>
<p><code>options</code> can include <code>start</code> and <code>end</code> values to read a range of bytes from
the file instead of the entire file.  Both <code>start</code> and <code>end</code> are inclusive and
start at 0. The <code>encoding</code> can be any one of those accepted by <a href="https://nodejs.org/docs/latest-v5.x/api/buffer.html#buffer_buffer"><code>Buffer</code></a>.

</p>
<p>If <code>fd</code> is specified, <code>ReadStream</code> will ignore the <code>path</code> argument and will use
the specified file descriptor. This means that no <code>'open'</code> event will be emitted.
Note that <code>fd</code> should be blocking; non-blocking <code>fd</code>s should be passed to
<a href="https://nodejs.org/docs/latest-v5.x/api/net.html#net_class_net_socket"><code>net.Socket</code></a>.

</p>
<p>If <code>autoClose</code> is false, then the file descriptor won't be closed, even if
there's an error.  It is your responsibility to close it and make sure
there's no file descriptor leak.  If <code>autoClose</code> is set to true (default
behavior), on <code>error</code> or <code>end</code> the file descriptor will be closed
automatically.

</p>
<p><code>mode</code> sets the file mode (permission and sticky bits), but only if the
file was created.

</p>
<p>An example to read the last 10 bytes of a file which is 100 bytes long:

</p>
<pre class="sh_sourceCode"><code class="js">fs<span class="sh_symbol">.</span><span class="sh_function">createReadStream</span><span class="sh_symbol">(</span><span class="sh_string">'sample.txt'</span><span class="sh_symbol">,</span> <span class="sh_cbracket">{</span>start<span class="sh_symbol">:</span> <span class="sh_number">90</span><span class="sh_symbol">,</span> end<span class="sh_symbol">:</span> <span class="sh_number">99</span><span class="sh_cbracket">}</span><span class="sh_symbol">);</span></code></pre>
<p>If <code>options</code> is a string, then it specifies the encoding.

</p>
<h2>fs.createWriteStream(path[, options])<span><a class="mark" href="https://nodejs.org/docs/latest-v5.x/api/fs.html#fs_fs_createwritestream_path_options" id="fs_fs_createwritestream_path_options">#</a></span></h2>
<p>Returns a new <a href="https://nodejs.org/docs/latest-v5.x/api/fs.html#fs_class_fs_writestream"><code>WriteStream</code></a> object. (See <a href="https://nodejs.org/docs/latest-v5.x/api/stream.html#stream_class_stream_writable">Writable Stream</a>).

</p>
<p><code>options</code> is an object or string with the following defaults:

</p>
<pre class="sh_sourceCode"><code class="js"><span class="sh_cbracket">{</span>
  flags<span class="sh_symbol">:</span> <span class="sh_string">'w'</span><span class="sh_symbol">,</span>
  defaultEncoding<span class="sh_symbol">:</span> <span class="sh_string">'utf8'</span><span class="sh_symbol">,</span>
  fd<span class="sh_symbol">:</span> <span class="sh_keyword">null</span><span class="sh_symbol">,</span>
  mode<span class="sh_symbol">:</span> 0o666<span class="sh_symbol">,</span>
  autoClose<span class="sh_symbol">:</span> <span class="sh_keyword">true</span>
<span class="sh_cbracket">}</span></code></pre>
<p><code>options</code> may also include a <code>start</code> option to allow writing data at
some position past the beginning of the file.  Modifying a file rather
than replacing it may require a <code>flags</code> mode of <code>r+</code> rather than the
default mode <code>w</code>. The <code>defaultEncoding</code> can be any one of those accepted by <a href="https://nodejs.org/docs/latest-v5.x/api/buffer.html#buffer_buffer"><code>Buffer</code></a>.

</p>
<p>If <code>autoClose</code> is set to true (default behavior) on <code>error</code> or <code>end</code>
the file descriptor will be closed automatically. If <code>autoClose</code> is false,
then the file descriptor won't be closed, even if there's an error.
It is your responsibility to close it and make sure
there's no file descriptor leak.

</p>
<p>Like <a href="https://nodejs.org/docs/latest-v5.x/api/fs.html#fs_class_fs_readstream"><code>ReadStream</code></a>, if <code>fd</code> is specified, <code>WriteStream</code> will ignore the
<code>path</code> argument and will use the specified file descriptor. This means that no
<code>'open'</code> event will be emitted. Note that <code>fd</code> should be blocking; non-blocking
<code>fd</code>s should be passed to <a href="https://nodejs.org/docs/latest-v5.x/api/net.html#net_class_net_socket"><code>net.Socket</code></a>.

</p>
<p>If <code>options</code> is a string, then it specifies the encoding.

</p>
<h2>fs.exists(path, callback)<span><a class="mark" href="https://nodejs.org/docs/latest-v5.x/api/fs.html#fs_fs_exists_path_callback" id="fs_fs_exists_path_callback">#</a></span></h2>
<pre class="api_stability api_stability_0 sh_sourceCode">Stability<span class="sh_symbol">:</span> <span class="sh_number">0</span> <span class="sh_symbol">-</span> Deprecated<span class="sh_symbol">:</span> Use <a href="https://nodejs.org/docs/latest-v5.x/api/fs.html#fs_fs_stat_path_callback"><code>fs<span class="sh_symbol">.</span><span class="sh_function">stat</span><span class="sh_symbol">()</span></code></a> or <a href="https://nodejs.org/docs/latest-v5.x/api/fs.html#fs_fs_access_path_mode_callback"><code>fs<span class="sh_symbol">.</span><span class="sh_function">access</span><span class="sh_symbol">()</span></code></a> instead<span class="sh_symbol">.</span></pre><p>Test whether or not the given path exists by checking with the file system.
Then call the <code>callback</code> argument with either true or false.  Example:

</p>
<pre class="sh_sourceCode"><code class="js">fs<span class="sh_symbol">.</span><span class="sh_function">exists</span><span class="sh_symbol">(</span><span class="sh_string">'/etc/passwd'</span><span class="sh_symbol">,</span> <span class="sh_symbol">(</span>exists<span class="sh_symbol">)</span> <span class="sh_symbol">=&gt;</span> <span class="sh_cbracket">{</span>
  console<span class="sh_symbol">.</span><span class="sh_function">log</span><span class="sh_symbol">(</span>exists <span class="sh_symbol">?</span> <span class="sh_string">'it</span><span class="sh_specialchar">\'</span><span class="sh_string">s there'</span> <span class="sh_symbol">:</span> <span class="sh_string">'no passwd!'</span><span class="sh_symbol">);</span>
<span class="sh_cbracket">}</span><span class="sh_symbol">);</span></code></pre>
<p><code>fs.exists()</code> should not be used to check if a file exists before calling
<code>fs.open()</code>. Doing so introduces a race condition since other processes may
change the file's state between the two calls. Instead, user code should
call <code>fs.open()</code> directly and handle the error raised if the file is
non-existent.

</p>
<h2>fs.existsSync(path)<span><a class="mark" href="https://nodejs.org/docs/latest-v5.x/api/fs.html#fs_fs_existssync_path" id="fs_fs_existssync_path">#</a></span></h2>
<pre class="api_stability api_stability_0 sh_sourceCode">Stability<span class="sh_symbol">:</span> <span class="sh_number">0</span> <span class="sh_symbol">-</span> Deprecated<span class="sh_symbol">:</span> Use <a href="https://nodejs.org/docs/latest-v5.x/api/fs.html#fs_fs_statsync_path"><code>fs<span class="sh_symbol">.</span><span class="sh_function">statSync</span><span class="sh_symbol">()</span></code></a> or <a href="https://nodejs.org/docs/latest-v5.x/api/fs.html#fs_fs_accesssync_path_mode"><code>fs<span class="sh_symbol">.</span><span class="sh_function">accessSync</span><span class="sh_symbol">()</span></code></a> instead<span class="sh_symbol">.</span></pre><p>Synchronous version of <a href="https://nodejs.org/docs/latest-v5.x/api/fs.html#fs_fs_exists_path_callback"><code>fs.exists()</code></a>.
Returns <code>true</code> if the file exists, <code>false</code> otherwise.

</p>
<h2>fs.fchmod(fd, mode, callback)<span><a class="mark" href="https://nodejs.org/docs/latest-v5.x/api/fs.html#fs_fs_fchmod_fd_mode_callback" id="fs_fs_fchmod_fd_mode_callback">#</a></span></h2>
<p>Asynchronous <a href="http://man7.org/linux/man-pages/man2/fchmod.2.html">fchmod(2)</a>. No arguments other than a possible exception
are given to the completion callback.

</p>
<h2>fs.fchmodSync(fd, mode)<span><a class="mark" href="https://nodejs.org/docs/latest-v5.x/api/fs.html#fs_fs_fchmodsync_fd_mode" id="fs_fs_fchmodsync_fd_mode">#</a></span></h2>
<p>Synchronous <a href="http://man7.org/linux/man-pages/man2/fchmod.2.html">fchmod(2)</a>. Returns <code>undefined</code>.

</p>
<h2>fs.fchown(fd, uid, gid, callback)<span><a class="mark" href="https://nodejs.org/docs/latest-v5.x/api/fs.html#fs_fs_fchown_fd_uid_gid_callback" id="fs_fs_fchown_fd_uid_gid_callback">#</a></span></h2>
<p>Asynchronous <a href="http://man7.org/linux/man-pages/man2/fchown.2.html">fchown(2)</a>. No arguments other than a possible exception are given
to the completion callback.

</p>
<h2>fs.fchownSync(fd, uid, gid)<span><a class="mark" href="https://nodejs.org/docs/latest-v5.x/api/fs.html#fs_fs_fchownsync_fd_uid_gid" id="fs_fs_fchownsync_fd_uid_gid">#</a></span></h2>
<p>Synchronous <a href="http://man7.org/linux/man-pages/man2/fchown.2.html">fchown(2)</a>. Returns <code>undefined</code>.

</p>
<h2>fs.fdatasync(fd, callback)<span><a class="mark" href="https://nodejs.org/docs/latest-v5.x/api/fs.html#fs_fs_fdatasync_fd_callback" id="fs_fs_fdatasync_fd_callback">#</a></span></h2>
<p>Asynchronous <a href="http://man7.org/linux/man-pages/man2/fdatasync.2.html">fdatasync(2)</a>. No arguments other than a possible exception are
given to the completion callback.

</p>
<h2>fs.fdatasyncSync(fd)<span><a class="mark" href="https://nodejs.org/docs/latest-v5.x/api/fs.html#fs_fs_fdatasyncsync_fd" id="fs_fs_fdatasyncsync_fd">#</a></span></h2>
<p>Synchronous <a href="http://man7.org/linux/man-pages/man2/fdatasync.2.html">fdatasync(2)</a>. Returns <code>undefined</code>.

</p>
<h2>fs.fstat(fd, callback)<span><a class="mark" href="https://nodejs.org/docs/latest-v5.x/api/fs.html#fs_fs_fstat_fd_callback" id="fs_fs_fstat_fd_callback">#</a></span></h2>
<p>Asynchronous <a href="http://man7.org/linux/man-pages/man2/fstat.2.html">fstat(2)</a>. The callback gets two arguments <code>(err, stats)</code> where
<code>stats</code> is a <code>fs.Stats</code> object. <code>fstat()</code> is identical to <a href="https://nodejs.org/docs/latest-v5.x/api/fs.html#fs_fs_stat_path_callback"><code>stat()</code></a>, except that
the file to be stat-ed is specified by the file descriptor <code>fd</code>.

</p>
<h2>fs.fstatSync(fd)<span><a class="mark" href="https://nodejs.org/docs/latest-v5.x/api/fs.html#fs_fs_fstatsync_fd" id="fs_fs_fstatsync_fd">#</a></span></h2>
<p>Synchronous <a href="http://man7.org/linux/man-pages/man2/fstat.2.html">fstat(2)</a>. Returns an instance of <code>fs.Stats</code>.

</p>
<h2>fs.fsync(fd, callback)<span><a class="mark" href="https://nodejs.org/docs/latest-v5.x/api/fs.html#fs_fs_fsync_fd_callback" id="fs_fs_fsync_fd_callback">#</a></span></h2>
<p>Asynchronous <a href="http://man7.org/linux/man-pages/man2/fsync.2.html">fsync(2)</a>. No arguments other than a possible exception are given
to the completion callback.

</p>
<h2>fs.fsyncSync(fd)<span><a class="mark" href="https://nodejs.org/docs/latest-v5.x/api/fs.html#fs_fs_fsyncsync_fd" id="fs_fs_fsyncsync_fd">#</a></span></h2>
<p>Synchronous <a href="http://man7.org/linux/man-pages/man2/fsync.2.html">fsync(2)</a>. Returns <code>undefined</code>.

</p>
<h2>fs.ftruncate(fd, len, callback)<span><a class="mark" href="https://nodejs.org/docs/latest-v5.x/api/fs.html#fs_fs_ftruncate_fd_len_callback" id="fs_fs_ftruncate_fd_len_callback">#</a></span></h2>
<p>Asynchronous <a href="http://man7.org/linux/man-pages/man2/ftruncate.2.html">ftruncate(2)</a>. No arguments other than a possible exception are
given to the completion callback.

</p>
<h2>fs.ftruncateSync(fd, len)<span><a class="mark" href="https://nodejs.org/docs/latest-v5.x/api/fs.html#fs_fs_ftruncatesync_fd_len" id="fs_fs_ftruncatesync_fd_len">#</a></span></h2>
<p>Synchronous <a href="http://man7.org/linux/man-pages/man2/ftruncate.2.html">ftruncate(2)</a>. Returns <code>undefined</code>.

</p>
<h2>fs.futimes(fd, atime, mtime, callback)<span><a class="mark" href="https://nodejs.org/docs/latest-v5.x/api/fs.html#fs_fs_futimes_fd_atime_mtime_callback" id="fs_fs_futimes_fd_atime_mtime_callback">#</a></span></h2>
<p>Change the file timestamps of a file referenced by the supplied file
descriptor.

</p>
<h2>fs.futimesSync(fd, atime, mtime)<span><a class="mark" href="https://nodejs.org/docs/latest-v5.x/api/fs.html#fs_fs_futimessync_fd_atime_mtime" id="fs_fs_futimessync_fd_atime_mtime">#</a></span></h2>
<p>Synchronous version of <a href="https://nodejs.org/docs/latest-v5.x/api/fs.html#fs_fs_futimes_fd_atime_mtime_callback"><code>fs.futimes()</code></a>. Returns <code>undefined</code>.

</p>
<h2>fs.lchmod(path, mode, callback)<span><a class="mark" href="https://nodejs.org/docs/latest-v5.x/api/fs.html#fs_fs_lchmod_path_mode_callback" id="fs_fs_lchmod_path_mode_callback">#</a></span></h2>
<p>Asynchronous <a href="https://www.freebsd.org/cgi/man.cgi?query=lchmod&amp;sektion=2">lchmod(2)</a>. No arguments other than a possible exception
are given to the completion callback.

</p>
<p>Only available on Mac OS X.

</p>
<h2>fs.lchmodSync(path, mode)<span><a class="mark" href="https://nodejs.org/docs/latest-v5.x/api/fs.html#fs_fs_lchmodsync_path_mode" id="fs_fs_lchmodsync_path_mode">#</a></span></h2>
<p>Synchronous <a href="https://www.freebsd.org/cgi/man.cgi?query=lchmod&amp;sektion=2">lchmod(2)</a>. Returns <code>undefined</code>.

</p>
<h2>fs.lchown(path, uid, gid, callback)<span><a class="mark" href="https://nodejs.org/docs/latest-v5.x/api/fs.html#fs_fs_lchown_path_uid_gid_callback" id="fs_fs_lchown_path_uid_gid_callback">#</a></span></h2>
<p>Asynchronous <a href="http://man7.org/linux/man-pages/man2/lchown.2.html">lchown(2)</a>. No arguments other than a possible exception are given
to the completion callback.

</p>
<h2>fs.lchownSync(path, uid, gid)<span><a class="mark" href="https://nodejs.org/docs/latest-v5.x/api/fs.html#fs_fs_lchownsync_path_uid_gid" id="fs_fs_lchownsync_path_uid_gid">#</a></span></h2>
<p>Synchronous <a href="http://man7.org/linux/man-pages/man2/lchown.2.html">lchown(2)</a>. Returns <code>undefined</code>.

</p>
<h2>fs.link(srcpath, dstpath, callback)<span><a class="mark" href="https://nodejs.org/docs/latest-v5.x/api/fs.html#fs_fs_link_srcpath_dstpath_callback" id="fs_fs_link_srcpath_dstpath_callback">#</a></span></h2>
<p>Asynchronous <a href="http://man7.org/linux/man-pages/man2/link.2.html">link(2)</a>. No arguments other than a possible exception are given to
the completion callback.

</p>
<h2>fs.linkSync(srcpath, dstpath)<span><a class="mark" href="https://nodejs.org/docs/latest-v5.x/api/fs.html#fs_fs_linksync_srcpath_dstpath" id="fs_fs_linksync_srcpath_dstpath">#</a></span></h2>
<p>Synchronous <a href="http://man7.org/linux/man-pages/man2/link.2.html">link(2)</a>. Returns <code>undefined</code>.

</p>
<h2>fs.lstat(path, callback)<span><a class="mark" href="https://nodejs.org/docs/latest-v5.x/api/fs.html#fs_fs_lstat_path_callback" id="fs_fs_lstat_path_callback">#</a></span></h2>
<p>Asynchronous <a href="http://man7.org/linux/man-pages/man2/lstat.2.html">lstat(2)</a>. The callback gets two arguments <code>(err, stats)</code> where
<code>stats</code> is a <code>fs.Stats</code> object. <code>lstat()</code> is identical to <code>stat()</code>, except that if
<code>path</code> is a symbolic link, then the link itself is stat-ed, not the file that it
refers to.

</p>
<h2>fs.lstatSync(path)<span><a class="mark" href="https://nodejs.org/docs/latest-v5.x/api/fs.html#fs_fs_lstatsync_path" id="fs_fs_lstatsync_path">#</a></span></h2>
<p>Synchronous <a href="http://man7.org/linux/man-pages/man2/lstat.2.html">lstat(2)</a>. Returns an instance of <code>fs.Stats</code>.

</p>
<h2>fs.mkdir(path[, mode], callback)<span><a class="mark" href="https://nodejs.org/docs/latest-v5.x/api/fs.html#fs_fs_mkdir_path_mode_callback" id="fs_fs_mkdir_path_mode_callback">#</a></span></h2>
<p>Asynchronous <a href="http://man7.org/linux/man-pages/man2/mkdir.2.html">mkdir(2)</a>. No arguments other than a possible exception are given
to the completion callback. <code>mode</code> defaults to <code>0o777</code>.

</p>
<h2>fs.mkdirSync(path[, mode])<span><a class="mark" href="https://nodejs.org/docs/latest-v5.x/api/fs.html#fs_fs_mkdirsync_path_mode" id="fs_fs_mkdirsync_path_mode">#</a></span></h2>
<p>Synchronous <a href="http://man7.org/linux/man-pages/man2/mkdir.2.html">mkdir(2)</a>. Returns <code>undefined</code>.

</p>
<h2>fs.mkdtemp(prefix, callback)<span><a class="mark" href="https://nodejs.org/docs/latest-v5.x/api/fs.html#fs_fs_mkdtemp_prefix_callback" id="fs_fs_mkdtemp_prefix_callback">#</a></span></h2>
<p>Creates a unique temporary directory.

</p>
<p>Generates six random characters to be appended behind a required
<code>prefix</code> to create a unique temporary directory.

</p>
<p>The created folder path is passed as a string to the callback's second
parameter.

</p>
<p>Example:

</p>
<pre class="sh_sourceCode"><code class="js">fs<span class="sh_symbol">.</span><span class="sh_function">mkdtemp</span><span class="sh_symbol">(</span><span class="sh_string">'/tmp/foo-'</span><span class="sh_symbol">,</span> <span class="sh_symbol">(</span>err<span class="sh_symbol">,</span> folder<span class="sh_symbol">)</span> <span class="sh_symbol">=&gt;</span> <span class="sh_cbracket">{</span>
  console<span class="sh_symbol">.</span><span class="sh_function">log</span><span class="sh_symbol">(</span>folder<span class="sh_symbol">);</span>
    <span class="sh_comment">// Prints: /tmp/foo-itXde2</span>
<span class="sh_cbracket">}</span><span class="sh_symbol">);</span></code></pre>
<h2>fs.mkdtempSync(template)<span><a class="mark" href="https://nodejs.org/docs/latest-v5.x/api/fs.html#fs_fs_mkdtempsync_template" id="fs_fs_mkdtempsync_template">#</a></span></h2>
<p>The synchronous version of [<code>fs.mkdtemp()</code>][]. Returns the created
folder path.

</p>
<h2>fs.open(path, flags[, mode], callback)<span><a class="mark" href="https://nodejs.org/docs/latest-v5.x/api/fs.html#fs_fs_open_path_flags_mode_callback" id="fs_fs_open_path_flags_mode_callback">#</a></span></h2>
<p>Asynchronous file open. See <a href="http://man7.org/linux/man-pages/man2/open.2.html">open(2)</a>. <code>flags</code> can be:

</p>
<ul>
<li><p><code>'r'</code> - Open file for reading.
An exception occurs if the file does not exist.</p>
</li>
<li><p><code>'r+'</code> - Open file for reading and writing.
An exception occurs if the file does not exist.</p>
</li>
<li><p><code>'rs'</code> - Open file for reading in synchronous mode. Instructs the operating
system to bypass the local file system cache.</p>
<p>This is primarily useful for opening files on NFS mounts as it allows you to
skip the potentially stale local cache. It has a very real impact on I/O
performance so don't use this flag unless you need it.</p>
<p>Note that this doesn't turn <code>fs.open()</code> into a synchronous blocking call.
If that's what you want then you should be using <code>fs.openSync()</code></p>
</li>
<li><p><code>'rs+'</code> - Open file for reading and writing, telling the OS to open it
synchronously. See notes for <code>'rs'</code> about using this with caution.</p>
</li>
<li><p><code>'w'</code> - Open file for writing.
The file is created (if it does not exist) or truncated (if it exists).</p>
</li>
<li><p><code>'wx'</code> - Like <code>'w'</code> but fails if <code>path</code> exists.</p>
</li>
<li><p><code>'w+'</code> - Open file for reading and writing.
The file is created (if it does not exist) or truncated (if it exists).</p>
</li>
<li><p><code>'wx+'</code> - Like <code>'w+'</code> but fails if <code>path</code> exists.</p>
</li>
<li><p><code>'a'</code> - Open file for appending.
The file is created if it does not exist.</p>
</li>
<li><p><code>'ax'</code> - Like <code>'a'</code> but fails if <code>path</code> exists.</p>
</li>
<li><p><code>'a+'</code> - Open file for reading and appending.
The file is created if it does not exist.</p>
</li>
<li><p><code>'ax+'</code> - Like <code>'a+'</code> but fails if <code>path</code> exists.</p>
</li>
</ul>
<p><code>mode</code> sets the file mode (permission and sticky bits), but only if the file was
created. It defaults to <code>0666</code>, readable and writable.

</p>
<p>The callback gets two arguments <code>(err, fd)</code>.

</p>
<p>The exclusive flag <code>'x'</code> (<code>O_EXCL</code> flag in <a href="http://man7.org/linux/man-pages/man2/open.2.html">open(2)</a>) ensures that <code>path</code> is newly
created. On POSIX systems, <code>path</code> is considered to exist even if it is a symlink
to a non-existent file. The exclusive flag may or may not work with network file
systems.

</p>
<p><code>flags</code> can also be a number as documented by <a href="http://man7.org/linux/man-pages/man2/open.2.html">open(2)</a>; commonly used constants
are available from <code>require('constants')</code>.  On Windows, flags are translated to
their equivalent ones where applicable, e.g. <code>O_WRONLY</code> to <code>FILE_GENERIC_WRITE</code>,
or <code>O_EXCL|O_CREAT</code> to <code>CREATE_NEW</code>, as accepted by CreateFileW.

</p>
<p>On Linux, positional writes don't work when the file is opened in append mode.
The kernel ignores the position argument and always appends the data to
the end of the file.

</p>
<h2>fs.openSync(path, flags[, mode])<span><a class="mark" href="https://nodejs.org/docs/latest-v5.x/api/fs.html#fs_fs_opensync_path_flags_mode" id="fs_fs_opensync_path_flags_mode">#</a></span></h2>
<p>Synchronous version of <a href="https://nodejs.org/docs/latest-v5.x/api/fs.html#fs_fs_open_path_flags_mode_callback"><code>fs.open()</code></a>. Returns an integer representing the file
descriptor.

</p>
<h2>fs.read(fd, buffer, offset, length, position, callback)<span><a class="mark" href="https://nodejs.org/docs/latest-v5.x/api/fs.html#fs_fs_read_fd_buffer_offset_length_position_callback" id="fs_fs_read_fd_buffer_offset_length_position_callback">#</a></span></h2>
<p>Read data from the file specified by <code>fd</code>.

</p>
<p><code>buffer</code> is the buffer that the data will be written to.

</p>
<p><code>offset</code> is the offset in the buffer to start writing at.

</p>
<p><code>length</code> is an integer specifying the number of bytes to read.

</p>
<p><code>position</code> is an integer specifying where to begin reading from in the file.
If <code>position</code> is <code>null</code>, data will be read from the current file position.

</p>
<p>The callback is given the three arguments, <code>(err, bytesRead, buffer)</code>.

</p>
<h2>fs.readdir(path, callback)<span><a class="mark" href="https://nodejs.org/docs/latest-v5.x/api/fs.html#fs_fs_readdir_path_callback" id="fs_fs_readdir_path_callback">#</a></span></h2>
<p>Asynchronous <a href="http://man7.org/linux/man-pages/man3/readdir.3.html">readdir(3)</a>.  Reads the contents of a directory.
The callback gets two arguments <code>(err, files)</code> where <code>files</code> is an array of
the names of the files in the directory excluding <code>'.'</code> and <code>'..'</code>.

</p>
<h2>fs.readdirSync(path)<span><a class="mark" href="https://nodejs.org/docs/latest-v5.x/api/fs.html#fs_fs_readdirsync_path" id="fs_fs_readdirsync_path">#</a></span></h2>
<p>Synchronous <a href="http://man7.org/linux/man-pages/man3/readdir.3.html">readdir(3)</a>. Returns an array of filenames excluding <code>'.'</code> and
<code>'..'</code>.

</p>
<h2>fs.readFile(file[, options], callback)<span><a class="mark" href="https://nodejs.org/docs/latest-v5.x/api/fs.html#fs_fs_readfile_file_options_callback" id="fs_fs_readfile_file_options_callback">#</a></span></h2>
<div class="signature"><ul>
<li><code>file</code> <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type" class="type">&lt;String&gt;</a> | <span class="type">&lt;Integer&gt;</span> filename or file descriptor</li>
<li><code>options</code> <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object" class="type">&lt;Object&gt;</a> | <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type" class="type">&lt;String&gt;</a><ul>
<li><code>encoding</code> <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type" class="type">&lt;String&gt;</a> | <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Null_type" class="type">&lt;Null&gt;</a> default = <code>null</code></li>
<li><code>flag</code> <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type" class="type">&lt;String&gt;</a> default = <code>'r'</code></li>
</ul>
</li>
<li><code>callback</code> <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function" class="type">&lt;Function&gt;</a></li>
</ul>
</div><p>Asynchronously reads the entire contents of a file. Example:

</p>
<pre class="sh_sourceCode"><code class="js">fs<span class="sh_symbol">.</span><span class="sh_function">readFile</span><span class="sh_symbol">(</span><span class="sh_string">'/etc/passwd'</span><span class="sh_symbol">,</span> <span class="sh_symbol">(</span>err<span class="sh_symbol">,</span> data<span class="sh_symbol">)</span> <span class="sh_symbol">=&gt;</span> <span class="sh_cbracket">{</span>
  <span class="sh_keyword">if</span> <span class="sh_symbol">(</span>err<span class="sh_symbol">)</span> <span class="sh_keyword">throw</span> err<span class="sh_symbol">;</span>
  console<span class="sh_symbol">.</span><span class="sh_function">log</span><span class="sh_symbol">(</span>data<span class="sh_symbol">);</span>
<span class="sh_cbracket">}</span><span class="sh_symbol">);</span></code></pre>
<p>The callback is passed two arguments <code>(err, data)</code>, where <code>data</code> is the
contents of the file.

</p>
<p>If no encoding is specified, then the raw buffer is returned.

</p>
<p>If <code>options</code> is a string, then it specifies the encoding. Example:

</p>
<pre class="sh_sourceCode"><code class="js">fs<span class="sh_symbol">.</span><span class="sh_function">readFile</span><span class="sh_symbol">(</span><span class="sh_string">'/etc/passwd'</span><span class="sh_symbol">,</span> <span class="sh_string">'utf8'</span><span class="sh_symbol">,</span> callback<span class="sh_symbol">);</span></code></pre>
<p>Any specified file descriptor has to support reading.

</p>
<p><em>Note: Specified file descriptors will not be closed automatically.</em>

</p>
<h2>fs.readFileSync(file[, options])<span><a class="mark" href="https://nodejs.org/docs/latest-v5.x/api/fs.html#fs_fs_readfilesync_file_options" id="fs_fs_readfilesync_file_options">#</a></span></h2>
<p>Synchronous version of <a href="https://nodejs.org/docs/latest-v5.x/api/fs.html#fs_fs_readfile_file_options_callback"><code>fs.readFile</code></a>. Returns the contents of the <code>file</code>.

</p>
<p>If the <code>encoding</code> option is specified then this function returns a
string. Otherwise it returns a buffer.

</p>
<h2>fs.readlink(path, callback)<span><a class="mark" href="https://nodejs.org/docs/latest-v5.x/api/fs.html#fs_fs_readlink_path_callback" id="fs_fs_readlink_path_callback">#</a></span></h2>
<p>Asynchronous <a href="http://man7.org/linux/man-pages/man2/readlink.2.html">readlink(2)</a>. The callback gets two arguments <code>(err,
linkString)</code>.

</p>
<h2>fs.readlinkSync(path)<span><a class="mark" href="https://nodejs.org/docs/latest-v5.x/api/fs.html#fs_fs_readlinksync_path" id="fs_fs_readlinksync_path">#</a></span></h2>
<p>Synchronous <a href="http://man7.org/linux/man-pages/man2/readlink.2.html">readlink(2)</a>. Returns the symbolic link's string value.

</p>
<h2>fs.realpath(path[, cache], callback)<span><a class="mark" href="https://nodejs.org/docs/latest-v5.x/api/fs.html#fs_fs_realpath_path_cache_callback" id="fs_fs_realpath_path_cache_callback">#</a></span></h2>
<p>Asynchronous <a href="http://man7.org/linux/man-pages/man2/realpath.2.html">realpath(2)</a>. The <code>callback</code> gets two arguments <code>(err,
resolvedPath)</code>. May use <code>process.cwd</code> to resolve relative paths. <code>cache</code> is an
object literal of mapped paths that can be used to force a specific path
resolution or avoid additional <code>fs.stat</code> calls for known real paths.

</p>
<p>Example:

</p>
<pre class="sh_sourceCode"><code class="js"><span class="sh_keyword">var</span> cache <span class="sh_symbol">=</span> <span class="sh_cbracket">{</span><span class="sh_string">'/etc'</span><span class="sh_symbol">:</span><span class="sh_string">'/private/etc'</span><span class="sh_cbracket">}</span><span class="sh_symbol">;</span>
fs<span class="sh_symbol">.</span><span class="sh_function">realpath</span><span class="sh_symbol">(</span><span class="sh_string">'/etc/passwd'</span><span class="sh_symbol">,</span> cache<span class="sh_symbol">,</span> <span class="sh_symbol">(</span>err<span class="sh_symbol">,</span> resolvedPath<span class="sh_symbol">)</span> <span class="sh_symbol">=&gt;</span> <span class="sh_cbracket">{</span>
  <span class="sh_keyword">if</span> <span class="sh_symbol">(</span>err<span class="sh_symbol">)</span> <span class="sh_keyword">throw</span> err<span class="sh_symbol">;</span>
  console<span class="sh_symbol">.</span><span class="sh_function">log</span><span class="sh_symbol">(</span>resolvedPath<span class="sh_symbol">);</span>
<span class="sh_cbracket">}</span><span class="sh_symbol">);</span></code></pre>
<h2>fs.readSync(fd, buffer, offset, length, position)<span><a class="mark" href="https://nodejs.org/docs/latest-v5.x/api/fs.html#fs_fs_readsync_fd_buffer_offset_length_position" id="fs_fs_readsync_fd_buffer_offset_length_position">#</a></span></h2>
<p>Synchronous version of <a href="https://nodejs.org/docs/latest-v5.x/api/fs.html#fs_fs_read_fd_buffer_offset_length_position_callback"><code>fs.read()</code></a>. Returns the number of <code>bytesRead</code>.

</p>
<h2>fs.realpathSync(path[, cache])<span><a class="mark" href="https://nodejs.org/docs/latest-v5.x/api/fs.html#fs_fs_realpathsync_path_cache" id="fs_fs_realpathsync_path_cache">#</a></span></h2>
<p>Synchronous <a href="http://man7.org/linux/man-pages/man2/realpath.2.html">realpath(2)</a>. Returns the resolved path. <code>cache</code> is an
object literal of mapped paths that can be used to force a specific path
resolution or avoid additional <code>fs.stat</code> calls for known real paths.

</p>
<h2>fs.rename(oldPath, newPath, callback)<span><a class="mark" href="https://nodejs.org/docs/latest-v5.x/api/fs.html#fs_fs_rename_oldpath_newpath_callback" id="fs_fs_rename_oldpath_newpath_callback">#</a></span></h2>
<p>Asynchronous <a href="http://man7.org/linux/man-pages/man2/rename.2.html">rename(2)</a>. No arguments other than a possible exception are given
to the completion callback.

</p>
<h2>fs.renameSync(oldPath, newPath)<span><a class="mark" href="https://nodejs.org/docs/latest-v5.x/api/fs.html#fs_fs_renamesync_oldpath_newpath" id="fs_fs_renamesync_oldpath_newpath">#</a></span></h2>
<p>Synchronous <a href="http://man7.org/linux/man-pages/man2/rename.2.html">rename(2)</a>. Returns <code>undefined</code>.

</p>
<h2>fs.rmdir(path, callback)<span><a class="mark" href="https://nodejs.org/docs/latest-v5.x/api/fs.html#fs_fs_rmdir_path_callback" id="fs_fs_rmdir_path_callback">#</a></span></h2>
<p>Asynchronous <a href="http://man7.org/linux/man-pages/man2/rmdir.2.html">rmdir(2)</a>. No arguments other than a possible exception are given
to the completion callback.

</p>
<h2>fs.rmdirSync(path)<span><a class="mark" href="https://nodejs.org/docs/latest-v5.x/api/fs.html#fs_fs_rmdirsync_path" id="fs_fs_rmdirsync_path">#</a></span></h2>
<p>Synchronous <a href="http://man7.org/linux/man-pages/man2/rmdir.2.html">rmdir(2)</a>. Returns <code>undefined</code>.

</p>
<h2>fs.stat(path, callback)<span><a class="mark" href="https://nodejs.org/docs/latest-v5.x/api/fs.html#fs_fs_stat_path_callback" id="fs_fs_stat_path_callback">#</a></span></h2>
<p>Asynchronous <a href="http://man7.org/linux/man-pages/man2/stat.2.html">stat(2)</a>. The callback gets two arguments <code>(err, stats)</code> where
<code>stats</code> is a <a href="https://nodejs.org/docs/latest-v5.x/api/fs.html#fs_class_fs_stats"><code>fs.Stats</code></a> object.  See the <a href="https://nodejs.org/docs/latest-v5.x/api/fs.html#fs_class_fs_stats"><code>fs.Stats</code></a> section for more
information.

</p>
<h2>fs.statSync(path)<span><a class="mark" href="https://nodejs.org/docs/latest-v5.x/api/fs.html#fs_fs_statsync_path" id="fs_fs_statsync_path">#</a></span></h2>
<p>Synchronous <a href="http://man7.org/linux/man-pages/man2/stat.2.html">stat(2)</a>. Returns an instance of <a href="https://nodejs.org/docs/latest-v5.x/api/fs.html#fs_class_fs_stats"><code>fs.Stats</code></a>.

</p>
<h2>fs.symlink(target, path[, type], callback)<span><a class="mark" href="https://nodejs.org/docs/latest-v5.x/api/fs.html#fs_fs_symlink_target_path_type_callback" id="fs_fs_symlink_target_path_type_callback">#</a></span></h2>
<p>Asynchronous <a href="http://man7.org/linux/man-pages/man2/symlink.2.html">symlink(2)</a>. No arguments other than a possible exception are given
to the completion callback.
The <code>type</code> argument can be set to <code>'dir'</code>, <code>'file'</code>, or <code>'junction'</code> (default
is <code>'file'</code>) and is only available on Windows (ignored on other platforms).
Note that Windows junction points require the destination path to be absolute.  When using
<code>'junction'</code>, the <code>target</code> argument will automatically be normalized to absolute path.

</p>
<p>Here is an example below:

</p>
<pre class="sh_sourceCode"><code class="js">fs<span class="sh_symbol">.</span><span class="sh_function">symlink</span><span class="sh_symbol">(</span><span class="sh_string">'./foo'</span><span class="sh_symbol">,</span> <span class="sh_string">'./new-port'</span><span class="sh_symbol">);</span></code></pre>
<p>It creates a symbolic link named "new-port" that points to "foo".

</p>
<h2>fs.symlinkSync(target, path[, type])<span><a class="mark" href="https://nodejs.org/docs/latest-v5.x/api/fs.html#fs_fs_symlinksync_target_path_type" id="fs_fs_symlinksync_target_path_type">#</a></span></h2>
<p>Synchronous <a href="http://man7.org/linux/man-pages/man2/symlink.2.html">symlink(2)</a>. Returns <code>undefined</code>.

</p>
<h2>fs.truncate(path, len, callback)<span><a class="mark" href="https://nodejs.org/docs/latest-v5.x/api/fs.html#fs_fs_truncate_path_len_callback" id="fs_fs_truncate_path_len_callback">#</a></span></h2>
<p>Asynchronous <a href="http://man7.org/linux/man-pages/man2/truncate.2.html">truncate(2)</a>. No arguments other than a possible exception are
given to the completion callback. A file descriptor can also be passed as the
first argument. In this case, <code>fs.ftruncate()</code> is called.

</p>
<h2>fs.truncateSync(path, len)<span><a class="mark" href="https://nodejs.org/docs/latest-v5.x/api/fs.html#fs_fs_truncatesync_path_len" id="fs_fs_truncatesync_path_len">#</a></span></h2>
<p>Synchronous <a href="http://man7.org/linux/man-pages/man2/truncate.2.html">truncate(2)</a>. Returns <code>undefined</code>.

</p>
<h2>fs.unlink(path, callback)<span><a class="mark" href="https://nodejs.org/docs/latest-v5.x/api/fs.html#fs_fs_unlink_path_callback" id="fs_fs_unlink_path_callback">#</a></span></h2>
<p>Asynchronous <a href="http://man7.org/linux/man-pages/man2/unlink.2.html">unlink(2)</a>. No arguments other than a possible exception are given
to the completion callback.

</p>
<h2>fs.unlinkSync(path)<span><a class="mark" href="https://nodejs.org/docs/latest-v5.x/api/fs.html#fs_fs_unlinksync_path" id="fs_fs_unlinksync_path">#</a></span></h2>
<p>Synchronous <a href="http://man7.org/linux/man-pages/man2/unlink.2.html">unlink(2)</a>. Returns <code>undefined</code>.

</p>
<h2>fs.unwatchFile(filename[, listener])<span><a class="mark" href="https://nodejs.org/docs/latest-v5.x/api/fs.html#fs_fs_unwatchfile_filename_listener" id="fs_fs_unwatchfile_filename_listener">#</a></span></h2>
<p>Stop watching for changes on <code>filename</code>. If <code>listener</code> is specified, only that
particular listener is removed. Otherwise, <em>all</em> listeners are removed and you
have effectively stopped watching <code>filename</code>.

</p>
<p>Calling <code>fs.unwatchFile()</code> with a filename that is not being watched is a
no-op, not an error.

</p>
<p><em>Note: <a href="https://nodejs.org/docs/latest-v5.x/api/fs.html#fs_fs_watch_filename_options_listener"><code>fs.watch()</code></a> is more efficient than <code>fs.watchFile()</code> and <code>fs.unwatchFile()</code>.
<code>fs.watch()</code> should be used instead of <code>fs.watchFile()</code> and <code>fs.unwatchFile()</code>
when possible.</em>

</p>
<h2>fs.utimes(path, atime, mtime, callback)<span><a class="mark" href="https://nodejs.org/docs/latest-v5.x/api/fs.html#fs_fs_utimes_path_atime_mtime_callback" id="fs_fs_utimes_path_atime_mtime_callback">#</a></span></h2>
<p>Change file timestamps of the file referenced by the supplied path.

</p>
<p>Note: the arguments <code>atime</code> and <code>mtime</code> of the following related functions does
follow the below rules:

</p>
<ul>
<li>If the value is a numberable string like <code>'123456789'</code>, the value would get
converted to corresponding number.</li>
<li>If the value is <code>NaN</code> or <code>Infinity</code>, the value would get converted to
<code>Date.now()</code>.</li>
</ul>
<h2>fs.utimesSync(path, atime, mtime)<span><a class="mark" href="https://nodejs.org/docs/latest-v5.x/api/fs.html#fs_fs_utimessync_path_atime_mtime" id="fs_fs_utimessync_path_atime_mtime">#</a></span></h2>
<p>Synchronous version of <a href="https://nodejs.org/docs/latest-v5.x/api/fs.html#fs_fs_futimes_fd_atime_mtime_callback"><code>fs.utimes()</code></a>. Returns <code>undefined</code>.

</p>
<h2>fs.watch(filename[, options][, listener])<span><a class="mark" href="https://nodejs.org/docs/latest-v5.x/api/fs.html#fs_fs_watch_filename_options_listener" id="fs_fs_watch_filename_options_listener">#</a></span></h2>
<p>Watch for changes on <code>filename</code>, where <code>filename</code> is either a file or a
directory.  The returned object is a <a href="https://nodejs.org/docs/latest-v5.x/api/fs.html#fs_class_fs_fswatcher"><code>fs.FSWatcher</code></a>.

</p>
<p>The second argument is optional. The <code>options</code> if provided should be an object.
The supported boolean members are <code>persistent</code> and <code>recursive</code>. <code>persistent</code>
indicates whether the process should continue to run as long as files are being
watched. <code>recursive</code> indicates whether all subdirectories should be watched, or
only the current directory. This applies when a directory is specified, and only
on supported platforms (See <a href="https://nodejs.org/docs/latest-v5.x/api/fs.html#fs_caveats">Caveats</a>).

</p>
<p>The default is <code>{ persistent: true, recursive: false }</code>.

</p>
<p>The listener callback gets two arguments <code>(event, filename)</code>.  <code>event</code> is either
<code>'rename'</code> or <code>'change'</code>, and <code>filename</code> is the name of the file which triggered
the event.

</p>
<h3>Caveats<span><a class="mark" href="https://nodejs.org/docs/latest-v5.x/api/fs.html#fs_caveats" id="fs_caveats">#</a></span></h3>
<!--type=misc-->

<p>The <code>fs.watch</code> API is not 100% consistent across platforms, and is
unavailable in some situations.

</p>
<p>The recursive option is only supported on OS X and Windows.

</p>
<h4>Availability<span><a class="mark" href="https://nodejs.org/docs/latest-v5.x/api/fs.html#fs_availability" id="fs_availability">#</a></span></h4>
<!--type=misc-->

<p>This feature depends on the underlying operating system providing a way
to be notified of filesystem changes.

</p>
<ul>
<li>On Linux systems, this uses <code>inotify</code>.</li>
<li>On BSD systems, this uses <code>kqueue</code>.</li>
<li>On OS X, this uses <code>kqueue</code> for files and 'FSEvents' for directories.</li>
<li>On SunOS systems (including Solaris and SmartOS), this uses <code>event ports</code>.</li>
<li>On Windows systems, this feature depends on <code>ReadDirectoryChangesW</code>.</li>
</ul>
<p>If the underlying functionality is not available for some reason, then
<code>fs.watch</code> will not be able to function.  For example, watching files or
directories on network file systems (NFS, SMB, etc.) often doesn't work
reliably or at all.

</p>
<p>You can still use <code>fs.watchFile</code>, which uses stat polling, but it is slower and
less reliable.

</p>
<h4>Inodes<span><a class="mark" href="https://nodejs.org/docs/latest-v5.x/api/fs.html#fs_inodes" id="fs_inodes">#</a></span></h4>
<!--type=misc-->

<p>On Linux and OS X systems, <code>fs.watch()</code> resolves the path to an <a href="http://www.linux.org/threads/intro-to-inodes.4130">inode</a> and
watches the inode. If the watched path is deleted and recreated, it is assigned
a new inode. The watch will emit an event for the delete but will continue
watching the <em>original</em> inode. Events for the new inode will not be emitted.
This is expected behavior.

</p>
<h4>Filename Argument<span><a class="mark" href="https://nodejs.org/docs/latest-v5.x/api/fs.html#fs_filename_argument" id="fs_filename_argument">#</a></span></h4>
<!--type=misc-->

<p>Providing <code>filename</code> argument in the callback is only supported on Linux and
Windows.  Even on supported platforms, <code>filename</code> is not always guaranteed to
be provided. Therefore, don't assume that <code>filename</code> argument is always
provided in the callback, and have some fallback logic if it is null.

</p>
<pre class="sh_sourceCode"><code class="js">fs<span class="sh_symbol">.</span><span class="sh_function">watch</span><span class="sh_symbol">(</span><span class="sh_string">'somedir'</span><span class="sh_symbol">,</span> <span class="sh_symbol">(</span>event<span class="sh_symbol">,</span> filename<span class="sh_symbol">)</span> <span class="sh_symbol">=&gt;</span> <span class="sh_cbracket">{</span>
  console<span class="sh_symbol">.</span><span class="sh_function">log</span><span class="sh_symbol">(</span>`event is<span class="sh_symbol">:</span> $<span class="sh_cbracket">{</span>event<span class="sh_cbracket">}</span>`<span class="sh_symbol">);</span>
  <span class="sh_keyword">if</span> <span class="sh_symbol">(</span>filename<span class="sh_symbol">)</span> <span class="sh_cbracket">{</span>
    console<span class="sh_symbol">.</span><span class="sh_function">log</span><span class="sh_symbol">(</span>`filename provided<span class="sh_symbol">:</span> $<span class="sh_cbracket">{</span>filename<span class="sh_cbracket">}</span>`<span class="sh_symbol">);</span>
  <span class="sh_cbracket">}</span> <span class="sh_keyword">else</span> <span class="sh_cbracket">{</span>
    console<span class="sh_symbol">.</span><span class="sh_function">log</span><span class="sh_symbol">(</span><span class="sh_string">'filename not provided'</span><span class="sh_symbol">);</span>
  <span class="sh_cbracket">}</span>
<span class="sh_cbracket">}</span><span class="sh_symbol">);</span></code></pre>
<h2>fs.watchFile(filename[, options], listener)<span><a class="mark" href="https://nodejs.org/docs/latest-v5.x/api/fs.html#fs_fs_watchfile_filename_options_listener" id="fs_fs_watchfile_filename_options_listener">#</a></span></h2>
<p>Watch for changes on <code>filename</code>. The callback <code>listener</code> will be called each
time the file is accessed.

</p>
<p>The <code>options</code> argument may be omitted. If provided, it should be an object. The
<code>options</code> object may contain a boolean named <code>persistent</code> that indicates
whether the process should continue to run as long as files are being watched.
The <code>options</code> object may specify an <code>interval</code> property indicating how often the
target should be polled in milliseconds. The default is
<code>{ persistent: true, interval: 5007 }</code>.

</p>
<p>The <code>listener</code> gets two arguments the current stat object and the previous
stat object:

</p>
<pre class="sh_sourceCode"><code class="js">fs<span class="sh_symbol">.</span><span class="sh_function">watchFile</span><span class="sh_symbol">(</span><span class="sh_string">'message.text'</span><span class="sh_symbol">,</span> <span class="sh_symbol">(</span>curr<span class="sh_symbol">,</span> prev<span class="sh_symbol">)</span> <span class="sh_symbol">=&gt;</span> <span class="sh_cbracket">{</span>
  console<span class="sh_symbol">.</span><span class="sh_function">log</span><span class="sh_symbol">(</span>`the current mtime is<span class="sh_symbol">:</span> $<span class="sh_cbracket">{</span>curr<span class="sh_symbol">.</span>mtime<span class="sh_cbracket">}</span>`<span class="sh_symbol">);</span>
  console<span class="sh_symbol">.</span><span class="sh_function">log</span><span class="sh_symbol">(</span>`the previous mtime was<span class="sh_symbol">:</span> $<span class="sh_cbracket">{</span>prev<span class="sh_symbol">.</span>mtime<span class="sh_cbracket">}</span>`<span class="sh_symbol">);</span>
<span class="sh_cbracket">}</span><span class="sh_symbol">);</span></code></pre>
<p>These stat objects are instances of <code>fs.Stat</code>.

</p>
<p>If you want to be notified when the file was modified, not just accessed,
you need to compare <code>curr.mtime</code> and <code>prev.mtime</code>.

</p>
<p><em>Note: when an <code>fs.watchFile</code> operation results in an <code>ENOENT</code> error, it will
 invoke the listener once, with all the fields zeroed (or, for dates, the Unix
 Epoch). In Windows, <code>blksize</code> and <code>blocks</code> fields will be <code>undefined</code>, instead
 of zero. If the file is created later on, the listener will be called again,
 with the latest stat objects. This is a change in functionality since v0.10.</em>

</p>
<p><em>Note: <a href="https://nodejs.org/docs/latest-v5.x/api/fs.html#fs_fs_watch_filename_options_listener"><code>fs.watch()</code></a> is more efficient than <code>fs.watchFile</code> and <code>fs.unwatchFile</code>.
<code>fs.watch</code> should be used instead of <code>fs.watchFile</code> and <code>fs.unwatchFile</code>
when possible.</em>

</p>
<h2>fs.write(fd, buffer, offset, length[, position], callback)<span><a class="mark" href="https://nodejs.org/docs/latest-v5.x/api/fs.html#fs_fs_write_fd_buffer_offset_length_position_callback" id="fs_fs_write_fd_buffer_offset_length_position_callback">#</a></span></h2>
<p>Write <code>buffer</code> to the file specified by <code>fd</code>.

</p>
<p><code>offset</code> and <code>length</code> determine the part of the buffer to be written.

</p>
<p><code>position</code> refers to the offset from the beginning of the file where this data
should be written. If <code>typeof position !== 'number'</code>, the data will be written
at the current position. See <a href="http://man7.org/linux/man-pages/man2/pwrite.2.html">pwrite(2)</a>.

</p>
<p>The callback will be given three arguments <code>(err, written, buffer)</code> where
<code>written</code> specifies how many <em>bytes</em> were written from <code>buffer</code>.

</p>
<p>Note that it is unsafe to use <code>fs.write</code> multiple times on the same file
without waiting for the callback. For this scenario,
<code>fs.createWriteStream</code> is strongly recommended.

</p>
<p>On Linux, positional writes don't work when the file is opened in append mode.
The kernel ignores the position argument and always appends the data to
the end of the file.

</p>
<h2>fs.write(fd, data[, position[, encoding]], callback)<span><a class="mark" href="https://nodejs.org/docs/latest-v5.x/api/fs.html#fs_fs_write_fd_data_position_encoding_callback" id="fs_fs_write_fd_data_position_encoding_callback">#</a></span></h2>
<p>Write <code>data</code> to the file specified by <code>fd</code>.  If <code>data</code> is not a Buffer instance
then the value will be coerced to a string.

</p>
<p><code>position</code> refers to the offset from the beginning of the file where this data
should be written. If <code>typeof position !== 'number'</code> the data will be written at
the current position. See <a href="http://man7.org/linux/man-pages/man2/pwrite.2.html">pwrite(2)</a>.

</p>
<p><code>encoding</code> is the expected string encoding.

</p>
<p>The callback will receive the arguments <code>(err, written, string)</code> where <code>written</code>
specifies how many <em>bytes</em> the passed string required to be written. Note that
bytes written is not the same as string characters. See <a href="https://nodejs.org/docs/latest-v5.x/api/buffer.html#buffer_class_method_buffer_bytelength_string_encoding"><code>Buffer.byteLength</code></a>.

</p>
<p>Unlike when writing <code>buffer</code>, the entire string must be written. No substring
may be specified. This is because the byte offset of the resulting data may not
be the same as the string offset.

</p>
<p>Note that it is unsafe to use <code>fs.write</code> multiple times on the same file
without waiting for the callback. For this scenario,
<code>fs.createWriteStream</code> is strongly recommended.

</p>
<p>On Linux, positional writes don't work when the file is opened in append mode.
The kernel ignores the position argument and always appends the data to
the end of the file.

</p>
<h2>fs.writeFile(file, data[, options], callback)<span><a class="mark" href="https://nodejs.org/docs/latest-v5.x/api/fs.html#fs_fs_writefile_file_data_options_callback" id="fs_fs_writefile_file_data_options_callback">#</a></span></h2>
<div class="signature"><ul>
<li><code>file</code> <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type" class="type">&lt;String&gt;</a> | <span class="type">&lt;Integer&gt;</span> filename or file descriptor</li>
<li><code>data</code> <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type" class="type">&lt;String&gt;</a> | <a href="https://nodejs.org/docs/latest-v5.x/api/buffer.html#buffer_class_buffer" class="type">&lt;Buffer&gt;</a></li>
<li><code>options</code> <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object" class="type">&lt;Object&gt;</a> | <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type" class="type">&lt;String&gt;</a><ul>
<li><code>encoding</code> <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type" class="type">&lt;String&gt;</a> | <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Null_type" class="type">&lt;Null&gt;</a> default = <code>'utf8'</code></li>
<li><code>mode</code> <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Number_type" class="type">&lt;Number&gt;</a> default = <code>0o666</code></li>
<li><code>flag</code> <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type" class="type">&lt;String&gt;</a> default = <code>'w'</code></li>
</ul>
</li>
<li><code>callback</code> <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function" class="type">&lt;Function&gt;</a></li>
</ul>
</div><p>Asynchronously writes data to a file, replacing the file if it already exists.
<code>data</code> can be a string or a buffer.

</p>
<p>The <code>encoding</code> option is ignored if <code>data</code> is a buffer. It defaults
to <code>'utf8'</code>.

</p>
<p>Example:

</p>
<pre class="sh_sourceCode"><code class="js">fs<span class="sh_symbol">.</span><span class="sh_function">writeFile</span><span class="sh_symbol">(</span><span class="sh_string">'message.txt'</span><span class="sh_symbol">,</span> <span class="sh_string">'Hello Node.js'</span><span class="sh_symbol">,</span> <span class="sh_symbol">(</span>err<span class="sh_symbol">)</span> <span class="sh_symbol">=&gt;</span> <span class="sh_cbracket">{</span>
  <span class="sh_keyword">if</span> <span class="sh_symbol">(</span>err<span class="sh_symbol">)</span> <span class="sh_keyword">throw</span> err<span class="sh_symbol">;</span>
  console<span class="sh_symbol">.</span><span class="sh_function">log</span><span class="sh_symbol">(</span><span class="sh_string">'It</span><span class="sh_specialchar">\'</span><span class="sh_string">s saved!'</span><span class="sh_symbol">);</span>
<span class="sh_cbracket">}</span><span class="sh_symbol">);</span></code></pre>
<p>If <code>options</code> is a string, then it specifies the encoding. Example:

</p>
<pre class="sh_sourceCode"><code class="js">fs<span class="sh_symbol">.</span><span class="sh_function">writeFile</span><span class="sh_symbol">(</span><span class="sh_string">'message.txt'</span><span class="sh_symbol">,</span> <span class="sh_string">'Hello Node.js'</span><span class="sh_symbol">,</span> <span class="sh_string">'utf8'</span><span class="sh_symbol">,</span> callback<span class="sh_symbol">);</span></code></pre>
<p>Any specified file descriptor has to support writing.

</p>
<p>Note that it is unsafe to use <code>fs.writeFile</code> multiple times on the same file
without waiting for the callback. For this scenario,
<code>fs.createWriteStream</code> is strongly recommended.

</p>
<p><em>Note: Specified file descriptors will not be closed automatically.</em>

</p>
<h2>fs.writeFileSync(file, data[, options])<span><a class="mark" href="https://nodejs.org/docs/latest-v5.x/api/fs.html#fs_fs_writefilesync_file_data_options" id="fs_fs_writefilesync_file_data_options">#</a></span></h2>
<p>The synchronous version of <a href="https://nodejs.org/docs/latest-v5.x/api/fs.html#fs_fs_writefile_file_data_options_callback"><code>fs.writeFile()</code></a>. Returns <code>undefined</code>.

</p>
<h2>fs.writeSync(fd, buffer, offset, length[, position])<span><a class="mark" href="https://nodejs.org/docs/latest-v5.x/api/fs.html#fs_fs_writesync_fd_buffer_offset_length_position" id="fs_fs_writesync_fd_buffer_offset_length_position">#</a></span></h2>
<h2>fs.writeSync(fd, data[, position[, encoding]])<span><a class="mark" href="https://nodejs.org/docs/latest-v5.x/api/fs.html#fs_fs_writesync_fd_data_position_encoding" id="fs_fs_writesync_fd_data_position_encoding">#</a></span></h2>
<p>Synchronous versions of <a href="https://nodejs.org/docs/latest-v5.x/api/fs.html#fs_fs_write_fd_buffer_offset_length_position_callback"><code>fs.write()</code></a>. Returns the number of bytes written.

</p>

      </div>
    </div>
  </div>
  <script src="./fs.ftl_files/sh_main.js"></script>
  <script src="./fs.ftl_files/sh_javascript.min.js"></script>
  <script>highlight(undefined, undefined, 'pre');</script>



</body></html>