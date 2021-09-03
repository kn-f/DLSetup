echo ">>> Starting"
echo ">>> Loading configuration into /etc/bash.bashrc"

echo "HISTTIMEFORMAT='%F %T '" >> /etc/bash.bashrc
echo 'HISTFILESIZE=-1' >> /etc/bash.bashrc
echo 'HISTSIZE=-1' >> /etc/bash.bashrc
echo 'HISTCONTROL=ignoredups' >> /etc/bash.bashrc

# Custom history configuration
echo '# Configure BASH to append (rather than overwrite the history):' >> /etc/bash.bashrc
echo 'shopt -s histappend' >> /etc/bash.bashrc

echo '# Attempt to save all lines of a multiple-line command in the same entry' >> /etc/bash.bashrc
echo 'shopt -s cmdhist' >> /etc/bash.bashrc

echo '# After each command, append to the history file and reread it' >> /etc/bash.bashrc
echo 'export PROMPT_COMMAND="${PROMPT_COMMAND:+$PROMPT_COMMAND$"\n"}history -a; history -c; history -r"' >> /etc/bash.bashrc

# Reload BASH for settings to take effect
echo ">>> Reloading BASH"
exec "$BASH"

echo ">>> Finished. Exiting."
